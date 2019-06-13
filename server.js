const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

// routess
const antibiotics = require("./routes/api/antibiotics");
const antibioticTypes = require("./routes/api/antibioticTypes");
const departments = require("./routes/api/departments");
const microorganisms = require("./routes/api/microorganisms");
const materials = require("./routes/api/materials");
const diagnosiss = require("./routes/api/diagnosiss");
const model = require("./routes/api/model");

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to Mongo
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected..."))
  .catch(console.log);

// Use Routes
app.use("/api/antibiotics", antibiotics);
app.use("/api/antibioticTypes", antibioticTypes);
app.use("/api/departments", departments);
app.use("/api/diagnosiss", diagnosiss);
app.use("/api/microorganisms", microorganisms);
app.use("/api/materials", materials);
app.use("/api/model", model);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server started on port ${port}`));
