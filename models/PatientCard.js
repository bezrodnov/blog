const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PatientCardSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

const PatientCard = mongoose.model("patientCard", PatientCardSchema);
module.exports = PatientCard;
