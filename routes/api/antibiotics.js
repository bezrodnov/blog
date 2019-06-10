const express = require("express");
const router = express.Router();

// Antibiotic Model
const Antibiotic = require("../../models/Antibiotic");
const AntibioticType = require("../../models/AntibioticType");

// @route   GET api/antibiotics
// @desc    Get All Antibiotics
// @access  Public
router.get("/", (req, res) => {
  Antibiotic.find().then(items => res.json(items));
});

// @route   POST api/antibiotics
// @desc    Create Antibiotic
// @access  Public
router.post("/", (req, res) => {
  AntibioticType.findById(req.body.type).then(type => {
    const newAntibiotic = new Antibiotic({
      name: req.body.name,
      type
    });
    newAntibiotic.save().then(item => res.json(item));
  });
});

// @route   DELETE api/antibiotics/:id
// @desc    Delete Antibiotic by id
// @access  Public
router.delete("/:id", (req, res) => {
  Antibiotic.findById(req.params.id)
    .then(antibiotic =>
      antibiotic.remove().then(() => res.json({ success: true }))
    )
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
