const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect((err, client, release) => {
  if (err) {
    console.error("Error connecting to database:", err.message, err.stack);
    return;
  }
  console.log("Successfully connected to Neon database");
  release();
});

module.exports = pool;
