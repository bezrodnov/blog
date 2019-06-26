const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: true
  },
  registerDate: {
    type: Date,
    default: Date.now
  }
});

UserSchema.virtual("displayName").get(function() {
  return this.name;
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
