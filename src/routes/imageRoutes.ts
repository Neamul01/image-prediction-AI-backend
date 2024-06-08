import { Router } from "express";
import { analyzeImage, saveAnalysis } from "../controllers/imageController";
import multer from "multer";

const upload = multer();

const router = Router();

router.post("/analyze", upload.single("image"), analyzeImage);
router.post("/save", saveAnalysis);

export default router;
