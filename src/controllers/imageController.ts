import { Request, Response } from "express";
import { analyzeImageService } from "../services/imageService";
import Analysis from "../models/analysisModel";

export const analyzeImage = async (req: Request, res: Response) => {
  try {
    // console.log(req.file);

    const imageData: string = (req.file as Express.Multer.File).buffer.toString(
      "base64"
    );

    const result = await analyzeImageService(imageData);
    res.json({ message: "Image processed successfully", data: result });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error processing image", error: error?.message });
  }
};

export const saveAnalysis = async (req: Request, res: Response) => {
  const { data } = req.body;

  try {
    const analysis = new Analysis(data);
    await analysis.save();
    res.json({ message: "Data saved successfully" });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error saving data", error: error?.message });
  }
};
