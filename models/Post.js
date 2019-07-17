const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  text: { type: String, required: true },
  creationDate: { type: Date, default: Date.now },
  userId: { type: Number, required: true },
});

const model = mongoose.model('post', schema);
module.exports = model;