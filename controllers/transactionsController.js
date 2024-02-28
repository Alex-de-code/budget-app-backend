// we need to import express to create the router for the resource.
const express = require("express");

// validate form requests
// next allows us to move on if conditions are met, we will check if the request body matches are data model keys, each inputed transaction must have exactly the same keys as the rest of the data architecture
function validateForm(req, res, next) {
  if (
    !req.body.item_name ||
    !req.body.amount ||
    !req.body.date ||
    !req.body.category ||
    !req.body.from
  )
    res.status(400).json({ message: "Invalid Inputs" });
  else next();
}

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

// POST ROUTE - create/add a transaction
// grab the information from the form
transactions.post("/", validateForm, (req, res) => {
  // need to fake create a new id. will take the last id number in the transactions array and add 1
  const newId = transactionsArray[transactionsArray.length - 1].id + 1;
  // create a new object to put the newId at the front of the key-value pairs
  const newObj = { id: newId, ...req.body };

  // push the new object
  transactionsArray.push(newObj);
  res.json({ transactions: transactionsArray });
  // create an id
});

// DELETE Route
transactions.delete("/:id", (req, res) => {
  // set id variable
  const { id } = req.params;
  // new transaction array with the filtered out id
  transactionsArray = transactionsArray.filter(
    (transaction) => transaction.id !== +id
  );
  // reset data to new transactions Array
  res.json({ transactions: transactionsArray });
});

// export transactions variable to be used in the app.js file
module.exports = transactions;
