"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const imageController_1 = require("../controllers/imageController");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
const router = (0, express_1.Router)();
router.post("/analyze", upload.single("image"), imageController_1.analyzeImage);
router.post("/save", imageController_1.saveAnalysis);
exports.default = router;
//# sourceMappingURL=imageRoutes.js.map