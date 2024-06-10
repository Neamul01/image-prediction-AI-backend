const { Router } = require("express");
const {
  analyzeImage,
  saveAnalysis,
} = require("../controllers/imageController");
const multer = require("multer");

const upload = multer();

const router = Router();

router.post("/analyze", upload.single("image"), analyzeImage);
router.post("/save", saveAnalysis);

export default router;
