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
// @desc    Create/Update Antibiotic Type
// @access  Public
router.post("/", (req, res) => {
  if (req.body._id) {
    // update use-case
    // TODO: find and update all related Antibiotics
    const { _id, __v, ...updates } = req.body;
    const filter = { _id: req.body._id };
    AntibioticType.updateOne(filter, updates).then(({ ok }) => {
      if (ok) {
        AntibioticType.findById(req.body._id).then(item => res.json(item));
      } else {
        // TODO: error processing
      }
    });
  } else {
    // create use-case
    const antibioticType = new AntibioticType({
      name: req.body.name
    });

    antibioticType.save().then(item => res.json(item));
  }
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
