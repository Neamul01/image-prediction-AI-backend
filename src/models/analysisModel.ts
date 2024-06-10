const mongoose = require("mongoose");

const { Schema } = mongoose;

const AnalysisSchema = new Schema({
  predictions: { type: Array, required: true },
  area: { type: String, required: true },
  trackedObjects: { type: Array, required: true },
});

module.exports = mongoose.model("Analysis", AnalysisSchema);
