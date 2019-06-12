const express = require("express");
const router = express.Router();

// All Models
const AntibioticType = require("../../models/AntibioticType");
const Antibiotic = require("../../models/Antibiotic");
const Department = require("../../models/Department");

const models = [AntibioticType, Antibiotic, Department];

router.get("/schema", (req, res) => {
  // build all models schema for use in UI
  const fullSchema = models.reduce((fullSchema, model) => {
    fullSchema[model.modelName] = {};
    Object.keys(model.prototype.schema.paths).forEach(pathName => {
      if (["_id", "__v"].indexOf(pathName) >= 0) {
        // skip system fields
        return;
      }

      const path = model.prototype.schema.paths[pathName];
      const currentSchema = { type: path.instance };

      if (path.instance === "Embedded") {
        models.some(other => {
          if (path.schema.$id === other.prototype.schema.$id) {
            currentSchema.ref = other.modelName;
            return true;
          }
        });
      }
      fullSchema[model.modelName][pathName] = currentSchema;
    });
    return fullSchema;
  }, {});

  res.json(fullSchema);
});

module.exports = router;
