const pool = require("../db/db");

exports.createRoom = async (req, res) => {
  try {
    const { name, capacity, floor, amenities } = req.body;

    if (capacity < 1) {
      return res.status(400).json({ error: "capacity must be positive" });
    }

    const result = await pool.query(
      `INSERT INTO rooms(name, capacity, floor, amenities)
       VALUES($1,$2,$3,$4) RETURNING *`,
      [name, capacity, floor, amenities],
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRooms = async (req, res) => {
  try {
    const { minCapacity, amenity } = req.query;

    let query = "SELECT * FROM rooms WHERE 1=1";
    let values = [];

    if (minCapacity) {
      values.push(minCapacity);
      query += ` AND capacity >= $${values.length}`;
    }

    if (amenity) {
      values.push(amenity);
      query += ` AND $${values.length} = ANY(amenities)`;
    }

    const result = await pool.query(query, values);

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
