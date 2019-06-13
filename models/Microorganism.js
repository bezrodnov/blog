const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const MicroorganismSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

const Microorganism = mongoose.model("microorganism", MicroorganismSchema);
module.exports = Microorganism;
