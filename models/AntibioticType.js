const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const AntibioticTypeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

AntibioticTypeSchema.virtual("displayName").get(function() {
  return this.name;
});

const AntibioticType = mongoose.model("antibioticType", AntibioticTypeSchema);
module.exports = AntibioticType;
