import express from "express";
import { generateAiSuggestions } from "../controllers/WaterPurityController.js";
import upload from "../config/multer.js";

const router = express.Router();

router.post("/check-purity", upload.single("image"), generateAiSuggestions)

export default router;