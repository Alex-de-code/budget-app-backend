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

// SHOW ROUTE
// create get route to return json to the client
transactions.get("/", (req, res) => {
  res.status(200).json({ transations: transactionsArray, message: "Success" });
});

// INDEX ROUTE
// get a single transaction
transactions.get("/:id", (req, res) => {
  const { id } = req.params;

  const transaction = transactionsArray.find(
    (transaction) => transaction.id === +id
  );
  // if transaction id is not found return 404 error
  if (!transaction) {
    res.status(404).json({ message: "Transaction not found" });
  } else {
    // if id is found return the transaction obj with that id
    res.status(200).json({ transaction, message: "Success" });
  }
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
  res
    // 200 status
    .status(200)
    //update transactions data to new transactionsArray
    .json({ transactions: transactionsArray, message: "Success" });
});

// UPDATE ROUTE
transactions.put("/:id", (req, res) => {
  // accessing id with req.params
  const { id } = req.params;
  // declared a variable and set it equal to the result of a specifc index given in the array
  const transactionIndex = transactionsArray.findIndex((log) => log.id === +id);
  //if transaction id isn't found return 404 error message
  if (transactionIndex === -1) {
    res.status(404).json({ message: "Transaction not found" });
  } else {
    //if id is found update transaction object at the given index to the inputs of the request body
    transactionsArray[transactionIndex] = req.body;
    res
      //success 200
      .status(200)
      //reset data to new transactionsArray
      .json({ transactions: transactionsArray, message: "Success" });
  }
});

// DELETE Route
transactions.delete("/:id", (req, res) => {
  // set id variable
  const { id } = req.params;
  // new transaction array with the filtered out id
  transactionsArray = transactionsArray.filter(
    (transaction) => transaction.id !== +id
  );
  // reset data to new transactions Array + 200 Status Success message handler
  res.status(200).json({ transactions: transactionsArray, message: "Success" });
});

// Error handling middleware -- server 500 error message
transactions.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// export transactions variable to be used in the app.js file
module.exports = transactions;
