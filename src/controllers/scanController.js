const tf = require("@tensorflow/tfjs-node");
const pool = require("../utils/db");
const { v4: uuidv4 } = require("uuid");

let model;
(async () => {
  model = await tf.loadGraphModel("file://Model/TensorFlow Js/model.json");
})();

const classLabels = ["kaleng", "botol kaca", "other", "botol plastik"];

exports.scanWaste = async (req, res) => {
  try {
    const userId = req.user.userId;
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Gambar tidak ditemukan." });
    }

    let imageTensor = tf.node
      .decodeImage(req.file.buffer, 3)
      .resizeBilinear([224, 224])
      .expandDims(0)
      .toFloat()
      .div(tf.scalar(255));

    const prediction = model.predict(imageTensor);
    const predictionArray = await prediction.data();
    const classIndex = predictionArray.indexOf(Math.max(...predictionArray));
    const jenis_sampah = classLabels[classIndex];

    let uangDidapat = 0;
    if (jenis_sampah === "botol plastik") uangDidapat = 500;
    else if (jenis_sampah === "botol kaca") uangDidapat = 700;
    else if (jenis_sampah === "kaleng") uangDidapat = 600;
    else if (jenis_sampah === "other") uangDidapat = 0;

    await pool.query(
      "INSERT INTO Scan (id, user_id, jenis_sampah, uang_didapat, created_at) VALUES ($1, $2, $3, $4, NOW())",
      [uuidv4(), userId, jenis_sampah, uangDidapat]
    );

    const cek = await pool.query("SELECT * FROM Saldo WHERE user_id = $1", [
      userId,
    ]);
    if (cek.rows.length === 0) {
      await pool.query(
        "INSERT INTO Saldo (id, user_id, saldo, updated_at) VALUES ($1, $2, $3, NOW())",
        [uuidv4(), userId, uangDidapat]
      );
    } else {
      await pool.query(
        "UPDATE Saldo SET saldo = saldo + $1, updated_at = NOW() WHERE user_id = $2",
        [uangDidapat, userId]
      );
    }
    return res.json({
      success: true,
      jenis_sampah,
      uang_didapat: uangDidapat,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error." });
  }
};
