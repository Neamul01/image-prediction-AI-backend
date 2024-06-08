import { Router } from "express";
import { analyzeImage, saveAnalysis } from "../controllers/imageController";

const router = Router();

router.post("/analyze", analyzeImage);
router.post("/save", saveAnalysis);

export default router;
