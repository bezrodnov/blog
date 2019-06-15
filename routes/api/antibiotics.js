const express = require("express");
const router = express.Router();

// Antibiotic Model
const Antibiotic = require("../../models/Antibiotic");
const AntibioticType = require("../../models/AntibioticType");

// @route   GET api/antibiotics
// @desc    Get All Antibiotics
// @access  Public
router.get("/", (req, res) => {
  Antibiotic.find().then(items =>
    res.json(
      items
        .map(item => item.toJSON({ virtuals: true }))
        .sort((a, b) => a.displayName.localeCompare(b.displayName))
    )
  );
});

// @route   POST api/antibiotics
// @desc    Create/Update Antibiotic
// @access  Public
router.post("/", (req, res) => {
  if (req.body._id) {
    // update use-case
    const { _id, __v, type, ...updates } = req.body;
    // find referenced antibiotic type and embed (if any)
    new Promise(resolve => {
      if (type) {
        AntibioticType.findById(type)
          .then(resolve)
          .catch(err => {
            console.error(err);
            resolve(null);
          });
      } else {
        resolve(null);
      }
    }).then(type => {
      if (type) {
        updates.type = type;
      }
      const filter = { _id: req.body._id };
      Antibiotic.updateOne(filter, updates).then(({ ok }) => {
        if (ok) {
          Antibiotic.findById(req.body._id).then(item => res.json(item));
        } else {
          // TODO: error processing
        }
      });
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
