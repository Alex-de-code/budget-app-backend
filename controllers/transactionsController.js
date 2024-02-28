// we need to import express to create the router for the resource.
const express = require("express");

// we need to create a Router which is a way to reference in app.js this file. the router creates an object that will house all the end points
const transactions = express.Router();

// we need to return the data from the model using our controller
let transactionsArray = require("../models/account.model.js");

// create get route to return json to the client
transactions.get("/", (req, res) => {
  res.json({ transations: transactionsArray });
});

// get a single transaction
transactions.get("/:id", (req, res) => {
  const { id } = req.params;

  const transaction = transactionsArray.find(
    (transaction) => transaction.id === +id
  );

  res.json({ transaction });
});

// export transactions variable to be used in the app.js file
module.exports = transactions;
