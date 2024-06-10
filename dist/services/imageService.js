"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeImageService = void 0;
const tf = __importStar(require("@tensorflow/tfjs-node"));
const cocoSsd = __importStar(require("@tensorflow-models/coco-ssd"));
// Register the backend
tf.setBackend("tensorflow");
// Verify backend
tf.ready().then(() => console.log("TensorFlow.js backend is ready"));
const analyzeImageService = (imageData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Decode the image and create a tensor
        let tensor = tf.node.decodeImage(Buffer.from(imageData, "base64"));
        // Remove the alpha channel if it exists
        if (tensor.shape[2] === 4) {
            tensor = tensor.slice([0, 0, 0], [-1, -1, 3]);
        }
        // Load the COCO-SSD model
        const model = yield cocoSsd.load();
        // Run the model on the tensor and get predictions
        const predictions = yield model.detect(tensor);
        // Define categories and area types
        const categories = ["man", "woman", "dog", "cat", "cow"];
        const areaTypes = ["house", "street", "restaurant", "shop", "office"];
        // Randomly select an area type (this is just a placeholder)
        const area = areaTypes[Math.floor(Math.random() * areaTypes.length)];
        const trackedObjects = predictions.map((pred) => pred.class);
        // Return the predictions, area type, and tracked objects
        return { predictions, area, trackedObjects };
    }
    catch (error) {
        console.error("Error processing image", error);
        throw new Error("Error processing image");
    }
});
exports.analyzeImageService = analyzeImageService;
//# sourceMappingURL=imageService.js.map