const express = require("express");
const expense_Traker = require("./expenseTracker");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 3001;
const mongoURI = process.env.MONGO_URI;

const app = express();
app.use(cors());
app.use(express.json());
mongoose
  .connect(mongoURI)
  .then((res) => console.log("Connection Successful"))
  .catch((err) => console.log(err));

app.post("/add", (req, res) => {
  const { title, amount } = req.body;
  expense_Traker
    .create({ title, amount })
    .then((result) => {
      console.log("Created Successfully");
      res
        .status(201)
        .json({ message: "Title added successfully", data: result });
    })
    .catch((err) => {
      console.error("Unable to create:", err);
      res.status(500).json({ error: "Failed to add task" });
    });
});

app.get("/get", (req, res) => {
  expense_Traker
    .find()
    .then((result) => {
      res.json(result);
      console.log(result);
    })
    .catch((err) => console.log(err));
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  expense_Traker
    .findByIdAndDelete(id)
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => console.log(err));
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  expense_Traker
    .findByIdAndUpdate(id, { amount: req.body.amount }, { new: true })
    .then((result) => {
      console.log(result);
      res.status(201).json(result);
    })
    .catch((err) => console.log(err));
});

app.listen(PORT, () => console.log("Server is Runining "));
