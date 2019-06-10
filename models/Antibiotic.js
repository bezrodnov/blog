const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const AntibioticSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Antibiotic = mongoose.model('antibiotic', AntibioticSchema);
module.exports = Antibiotic;
