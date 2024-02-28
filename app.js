// DEPENDENCIES
const express = require("express");
const cors = require("cors");

// CONFIGURATION
const app = express();

// import the controller in order to tell the application to use the specific resource's controller
// const logsController = require("./controllers/logsController.js");

// MIDDLEWARE PACKAGES
app.use(cors());
// needed for POST and PUT. Will parse the string sent from the fetch
app.use(express.json());

// MIDDLEWARE FOR CONTROLLERS
// We want to use the logsController routes with this base url
// app.use("/logs", logsController);

// ROUTES
app.get("/", (req, res) => {
  res.send("welcome to the budgeting app!");
});

// 404 PAGE
app.get("*", (req, res) => {
  res.json({ error: "Page not found" });
});

// EXPORT
module.exports = app;
