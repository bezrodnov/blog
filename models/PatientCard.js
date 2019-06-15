const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PatientCardSchema = new Schema({
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  patronymic: { type: String, required: true },
  birthDate: { type: Date, required: true },
  gender: { type: Boolean, required: true }
});

PatientCardSchema.virtual("displayName").get(function() {
  return `${this.lastName} ${this.firstName} ${this.patronymic}`;
});

const PatientCard = mongoose.model("patientCard", PatientCardSchema);
module.exports = PatientCard;
