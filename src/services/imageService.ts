import * as tf from "@tensorflow/tfjs-node";
import * as cocoSsd from "@tensorflow-models/coco-ssd";

// Register the backend
tf.setBackend("tensorflow");

// Verify backend
tf.ready().then(() => console.log("TensorFlow.js backend is ready"));

export const analyzeImageService = async (imageData: string) => {
  try {
    let tensor = tf.node.decodeImage(Buffer.from(imageData, "base64"));

    // Remove alpha channel if it exists
    if (tensor.shape[2] === 4) {
      tensor = tensor.slice([0, 0, 0], [-1, -1, 3]);
    }

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
