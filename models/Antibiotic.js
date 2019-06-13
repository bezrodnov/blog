const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AntibioticType = require("./AntibioticType");

// Create Schema
const AntibioticSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  type: AntibioticType.prototype.schema
});

const Antibiotic = mongoose.model("antibiotic", AntibioticSchema);
module.exports = Antibiotic;
