import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { mobs } from "../data/mobs.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json(mobs);
});

router.get("/:mobsID", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "../public/mobs.html"));
});

export default router;
