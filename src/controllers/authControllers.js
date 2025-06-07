const pool = require("../utils/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res
          .status(400)
          .json({ error: "Name, email, and password are required" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const id = uuidv4();
      const now = new Date();

      const insertQuery =
        'INSERT INTO "User" (id, name, email, password, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, name, email';
      const values = [id, name, email, hashedPassword, now, now];
      const result = await pool.query(insertQuery, values);
      const user = result.rows[0];

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(201).json({ ...user, token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const selectQuery = 'SELECT * FROM "User" WHERE email = $1';
      const result = await pool.query(selectQuery, [email]);
      const user = result.rows[0];
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
