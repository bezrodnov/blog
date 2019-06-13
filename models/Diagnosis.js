const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const DiagnosisSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

const Diagnosis = mongoose.model("diagnosis", DiagnosisSchema);
module.exports = Diagnosis;
