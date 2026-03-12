const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "admin123",
  port: 5432,
});

pool.connect((err, client, release) => {
  if (err) {
    console.error("❌ Error connecting to PostgreSQL:", err);
  } else {
    console.log("✅ PostgreSQL connected successfully!");
    release();
  }
});

module.exports = pool;
