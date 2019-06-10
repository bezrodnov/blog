const express = require("express");
const router = express.Router();

// Antibiotic Type Model
const AntibioticType = require("../../models/AntibioticType");

// @route   GET api/antibioticTypes
// @desc    Get All Antibiotic Types
// @access  Public
router.get("/", (req, res) => {
  AntibioticType.find().then(items => res.json(items));
});

// @route   POST api/antibioticTypes
// @desc    Create Antibiotic Type
// @access  Public
router.post("/", (req, res) => {
  const newAntibioticType = new AntibioticType({
    name: req.body.name
  });

  newAntibioticType.save().then(item => res.json(item));
});

// @route   DELETE api/antibioticTypes/:id
// @desc    Delete Antibiotic Type by id
// @access  Public
router.delete("/:id", (req, res) => {
  AntibioticType.findById(req.params.id)
    .then(antibioticType =>
      antibioticType.remove().then(() => res.json({ success: true }))
    )
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
