const pool = require("../config/db");

exports.getScanHistory = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const result = await pool.query(
      "SELECT id, jenis_sampah, uang_didapat, created_at FROM Scan WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3",
      [userId, limit, offset]
    );
    const totalResult = await pool.query(
      "SELECT COUNT(*) FROM Scan WHERE user_id = $1",
      [userId]
    );
    const totalItems = parseInt(totalResult.rows[0].count);
    res.json({
      success: true,
      history: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

module.exports = exports;
