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
  type: {
    type: AntibioticType.prototype.schema,
    required: true
  }
});

AntibioticSchema.virtual("displayName").get(function() {
  return this.name;
});

const Antibiotic = mongoose.model("antibiotic", AntibioticSchema);
module.exports = Antibiotic;
