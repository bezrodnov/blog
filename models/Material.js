const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const MaterialSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

MaterialSchema.virtual("displayName").get(function() {
  return this.name;
});

const Material = mongoose.model("material", MaterialSchema);
module.exports = Material;
