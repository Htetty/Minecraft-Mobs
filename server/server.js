import express from "express";
import "./config/dotenv.js";
import path from "path";
import { fileURLToPath } from "url";
import mobsRouter from "./routes/mobs.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, "../client/public")));

app.get("/", (req, res) => {
  res
    .status(200)
    .sendFile(path.resolve(__dirname, "../client/public/index.html"));
});

app.get("/mobs/:slug", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/public/mobs.html"));
});

app.use("/mobs", mobsRouter);

app.use((req, res) => {
  res
    .status(404)
    .sendFile(path.resolve(__dirname, "../client/public/404.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening at http://localhost:${PORT}`);
});
