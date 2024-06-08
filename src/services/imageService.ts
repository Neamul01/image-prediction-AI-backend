import * as tf from "@tensorflow/tfjs-node";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import { Canvas, Image } from "canvas";

// Register the backend
tf.setBackend("tensorflow");

// Verify backend
tf.ready().then(() => console.log("TensorFlow.js backend is ready"));

export const analyzeImageService = async (imageData: string) => {
  try {
    const tensor = tf.node.decodeImage(Buffer.from(imageData, "base64"));

    const model = await cocoSsd.load();
    const predictions = await model.detect(tensor as any);

    const categories = ["man", "woman", "dog", "cat", "cow"];
    const areaTypes = ["house", "street", "restaurant", "shop", "office"];
    const area = areaTypes[Math.floor(Math.random() * areaTypes.length)];
    const trackedObjects = predictions.map((pred) => pred.class);

    return { predictions, area, trackedObjects };
  } catch (error) {
    console.error("Error processing image", error);
    throw new Error("Error processing image");
  }
};
