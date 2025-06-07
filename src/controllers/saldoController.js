const pool = require("../config/db");

exports.getSaldo = async (req, res) => {
  try {
    const userId = req.user.userId;
    const result = await pool.query(
      "SELECT saldo FROM Saldo WHERE user_id = $1",
      [userId]
    );
    if (!result.rows.length)
      return res.status(404).json({ error: "Saldo user tidak ditemukan" });
    res.json({ saldo: result.rows[0].saldo });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
