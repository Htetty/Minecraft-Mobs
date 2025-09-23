import express from "express";
const app = express();

import mobsRouter from "./routes/mobs.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "public/index.html"));
});

app.use("/mobs", mobsRouter);

app.use((req, res) => {
  res.status(404).sendFile(path.resolve(__dirname, "public/404.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening at http://localhost:${PORT}`);
});
