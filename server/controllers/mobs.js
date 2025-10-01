import { pool } from "../config/database.js";

const getMobs = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM mobs ORDER BY id ASC");
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};

export default getMobs;
