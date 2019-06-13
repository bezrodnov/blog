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
// @desc    Create/Update Antibiotic
// @access  Public
router.post("/", (req, res) => {
  if (req.body._id) {
    // update use-case
    // TODO: find referenced antibiotic type and embed
    const { _id, __v, ...updates } = req.body;
    const filter = { _id: req.body._id };
    Antibiotic.updateOne(filter, updates).then(({ ok }) => {
      if (ok) {
        Antibiotic.findById(req.body._id).then(item => res.json(item));
      } else {
        // TODO: error processing
      }
    });
  } else {
    // create use-case
    AntibioticType.findById(req.body.type).then(type => {
      const antibiotic = new Antibiotic({
        name: req.body.name,
        type
      });
      antibiotic.save().then(item => res.json(item));
    });
  }
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
