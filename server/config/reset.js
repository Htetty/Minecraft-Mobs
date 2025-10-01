import { pool } from "./database.js";
import dotenv from "./dotenv.js";
import { mobs } from "../data/mobs.js";

async function createMobsTable() {
  const createTableQuery = `
      DROP TABLE IF EXISTS mobs;
  
      CREATE TABLE IF NOT EXISTS mobs (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          slug VARCHAR(255) NOT NULL UNIQUE,
          type VARCHAR(50) NOT NULL,
          biome VARCHAR(255) NOT NULL,
          drops TEXT[] NOT NULL,
          image VARCHAR(255) NOT NULL,
          background VARCHAR(255) NOT NULL,
          description TEXT NOT NULL
      )`;

  try {
    const res = await pool.query(createTableQuery);
    console.log("🎉 mobs table created successfully");
  } catch (err) {
    console.error("⚠️ error creating mobs table", err);
  }
}

const seedMobsTable = async () => {
  await createMobsTable();

  mobs.forEach((mob) => {
    const insertQuery = {
      text: `INSERT INTO mobs
               (name, slug, type, biome, drops, image, background, description)
               VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    };

    const values = [
      mob.name,
      mob.slug,
      mob.type,
      mob.biome,
      mob.drops,
      mob.image,
      mob.background,
      mob.description,
    ];

    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error("⚠️ error inserting mob", err);
        return;
      }
      console.log(`✅ ${mob.name} added successfully`);
    });
  });
};

seedMobsTable();
