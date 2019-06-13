const express = require("express");
const router = express.Router();

// All Models
const AntibioticType = require("../../models/AntibioticType");
const Antibiotic = require("../../models/Antibiotic");
const Department = require("../../models/Department");
const Diagnosis = require("../../models/Diagnosis");
const Microorganism = require("../../models/Microorganism");
const Material = require("../../models/Material");

const models = [
  AntibioticType,
  Antibiotic,
  Microorganism,
  Material,
  Diagnosis,
  Department
];

router.get("/schema", (req, res) => {
  // build all models schema for use in UI
  const fullSchema = models.map(model => {
    const fields = [];
    Object.keys(model.prototype.schema.paths).forEach(name => {
      if (["_id", "__v"].indexOf(name) >= 0) {
        // skip system fields
        return;
      }

      const path = model.prototype.schema.paths[name];
      const field = { name, type: path.instance };
      fields.push(field);

      if (path.instance === "Embedded") {
        models.some(other => {
          if (path.schema.$id === other.prototype.schema.$id) {
            field.ref = other.modelName;
            return true;
          }
        });
      }
    });

    return {
      modelName: model.modelName,
      fields
    };
  });

  res.json(fullSchema);
});

module.exports = router;
