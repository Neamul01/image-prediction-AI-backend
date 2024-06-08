import mongoose, { Schema, Document } from "mongoose";

interface IAnalysis extends Document {
  predictions: any[];
  area: string;
  trackedObjects: string[];
}

const AnalysisSchema: Schema = new Schema({
  predictions: { type: Array, required: true },
  area: { type: String, required: true },
  trackedObjects: { type: Array, required: true },
});

export default mongoose.model<IAnalysis>("Analysis", AnalysisSchema);
