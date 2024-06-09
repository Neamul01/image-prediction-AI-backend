import * as tf from "@tensorflow/tfjs-node";
import * as cocoSsd from "@tensorflow-models/coco-ssd";

// Register the backend
tf.setBackend("tensorflow");

// Verify backend
tf.ready().then(() => console.log("TensorFlow.js backend is ready"));

export const analyzeImageService = async (imageData: string) => {
  try {
    // Decode the image and create a tensor
    let tensor = tf.node.decodeImage(Buffer.from(imageData, "base64"));

    // Remove the alpha channel if it exists
    if (tensor.shape[2] === 4) {
      tensor = tensor.slice([0, 0, 0], [-1, -1, 3]);
    }

    // Load the COCO-SSD model
    const model = await cocoSsd.load();

    // Run the model on the tensor and get predictions
    const predictions = await model.detect(tensor as any);

    // Define categories and area types
    const categories = ["man", "woman", "dog", "cat", "cow"];
    const areaTypes = ["house", "street", "restaurant", "shop", "office"];

    // Randomly select an area type (this is just a placeholder)
    const area = areaTypes[Math.floor(Math.random() * areaTypes.length)];
    const trackedObjects = predictions.map((pred) => pred.class);

    // Return the predictions, area type, and tracked objects
    return { predictions, area, trackedObjects };
  } catch (error) {
    console.error("Error processing image", error);
    throw new Error("Error processing image");
  }
};
