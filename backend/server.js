import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectMongoDB from "./src/config/connectDB.js";
import connectCloudinary from "./src/config/connectCloudinary.js";
import router from "./src/routes/WaterPurityRoutes.js";

await connectMongoDB();
await connectCloudinary();

const app = express();

const allowedOrigins = ["http://localhost:5173"];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.use("/api/water-purity", router);

app.get("/", (req, res) => {
  res.send("Water Purity Checker Backend is running.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
