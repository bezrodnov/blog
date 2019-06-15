const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const DepartmentSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

DepartmentSchema.virtual("displayName").get(function() {
  return this.name;
});

const Department = mongoose.model("department", DepartmentSchema);
module.exports = Department;
