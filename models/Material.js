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

const Material = mongoose.model("material", MaterialSchema);
module.exports = Material;
