const express = require("express");

module.exports = {
  createRoute: Model => {
    const router = express.Router();

    // Get all model instances
    router.get("/", (req, res) => {
      Model.find().then(items =>
        res.json(items.map(item => item.toJSON({ virtuals: true })))
      );
    });

    // Create/Update model
    router.post("/", (req, res) => {
      const { _id, __v, ...values } = req.body;
      if (_id) {
        // update by id
        Model.updateOne({ _id }, values).then(({ ok }) => {
          if (ok) {
            Model.findById(_id).then(item => res.json(item));
          } else {
            // TODO: error processing
            res.json({ success: false });
          }
        });
      } else {
        // create use-case
        new Model(values)
          .save()
          .then(model => res.json(model))
          .catch(err => res.json({ success: false, err }));
      }
    });

    // Delete model by id
    router.delete("/:id", (req, res) => {
      Model.findById(req.params.id)
        .then(model => model.remove().then(() => res.json({ success: true })))
        .catch(err => res.json({ success: false, err }));
    });

    return router;
  }
};
