const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");

const app = express();

// Bodyparser Middleware
app.use(express.json());

// DB Config
const db = config.get("mongoURI");

// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch(console.log);

// Use Routes
app.use("/api/patientCards", require("./routes/api/patientCards"));
app.use("/api/antibiotics", require("./routes/api/antibiotics"));
app.use("/api/antibioticTypes", require("./routes/api/antibioticTypes"));
app.use("/api/departments", require("./routes/api/departments"));
app.use("/api/diagnosiss", require("./routes/api/diagnosiss"));
app.use("/api/microorganisms", require("./routes/api/microorganisms"));
app.use("/api/materials", require("./routes/api/materials"));
app.use("/api/model", require("./routes/api/model"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

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
