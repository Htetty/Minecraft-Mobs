import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { mobs } from "../data/mobs.js"; // not needed anymore
import getMobs from "../controllers/mobs.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get("/", getMobs);

router.get("/:mobsID", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../client/public/mobs.html"));
});

export default router;
