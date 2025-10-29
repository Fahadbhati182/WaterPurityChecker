import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectMongoDB from "./src/config/connectDB.js";
import connectCloudinary from "./src/config/connectCloudinary.js";
import router from "./src/routes/WaterPurityRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

await connectMongoDB();
await connectCloudinary();


const app = express();

const allowedOrigins = [
  "*",
  "http://localhost:5173",
  "http://localhost:8000",
  "https://waterpuritychecker-33.onrender.com",
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.use("/api/water-purity", router);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get(/.*/, (_, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
