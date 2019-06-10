const express = require('express');
const router = express.Router();

// Antibiotic Model
const Antibiotic = require('../../models/Antibiotic');

// @route   GET api/antibiotics
// @desc    Get All Antibiotics
// @access  Public
router.get('/', (req, res) => {
  Antibiotic.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

// @route   POST api/antibiotics
// @desc    Create Antibiotic
// @access  Public
router.post('/', (req, res) => {
  const newAntibiotic = new Antibiotic({
    name: req.body.name,
  });

  newAntibiotic.save().then(item => res.json(item));
});

// @route   DELETE api/antibiotics/:id
// @desc    Delete Antibiotic by id
// @access  Public
router.delete('/:id', (req, res) => {
  Antibiotic.findById(req.params.id)
    .then(antibiotic =>
      antibiotic.remove().then(() => res.json({ success: true }))
    )
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
