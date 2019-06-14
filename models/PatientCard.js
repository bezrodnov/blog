const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PatientCardSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  patronymic: { type: String, required: true },
  birthDate: { type: Date, required: true },
  gender: { type: Boolean, required: true }
});

const PatientCard = mongoose.model("patientCard", PatientCardSchema);
module.exports = PatientCard;
