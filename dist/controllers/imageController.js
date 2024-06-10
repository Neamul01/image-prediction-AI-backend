"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveAnalysis = exports.analyzeImage = void 0;
const imageService_1 = require("../services/imageService");
const analysisModel_1 = __importDefault(require("../models/analysisModel"));
const analyzeImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(req.file);
        const imageData = req.file.buffer.toString("base64");
        const result = yield (0, imageService_1.analyzeImageService)(imageData);
        res.json({ message: "Image processed successfully", data: result });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error processing image", error: error === null || error === void 0 ? void 0 : error.message });
    }
});
exports.analyzeImage = analyzeImage;
const saveAnalysis = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = req.body;
    try {
        const analysis = new analysisModel_1.default(data);
        yield analysis.save();
        res.json({ message: "Data saved successfully" });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error saving data", error: error === null || error === void 0 ? void 0 : error.message });
    }
});
exports.saveAnalysis = saveAnalysis;
//# sourceMappingURL=imageController.js.map