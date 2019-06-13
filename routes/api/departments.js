const express = require("express");
const router = express.Router();

// Department Model
const Department = require("../../models/Department");

// @route   GET api/departments
// @desc    Get All Departments
// @access  Public
router.get("/", (req, res) => {
  Department.find().then(items => res.json(items));
});

// @route   POST api/departments
// @desc    Create/Update Department
// @access  Public
router.post("/", (req, res) => {
  if (req.body._id) {
    // update use-case
    const { _id, __v, ...updates } = req.body;
    const filter = { _id: req.body._id };
    Department.updateOne(filter, updates).then(({ ok }) => {
      if (ok) {
        Department.findById(req.body._id).then(item => res.json(item));
      } else {
        // TODO: error processing
      }
    });
  } else {
    // create use-case
    const department = new Department({
      name: req.body.name
    });

    department.save().then(item => res.json(item));
  }
});

// @route   DELETE api/departments/:id
// @desc    Delete Department by id
// @access  Public
router.delete("/:id", (req, res) => {
  Department.findById(req.params.id)
    .then(department =>
      department.remove().then(() => res.json({ success: true }))
    )
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
