const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TaskRouter = require("./routes/Task");

const app = express();
require("dotenv").config();
app.use(express.json());
app.use(cors());

app.use("/api/v1", TaskRouter);

app.get("/", (req, res) => res.send("here"));

// mongodb+srv://franckie:<password>@i-reporter.ouszx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// mongoose.connect('
// mongodb+srv://franckie:<password>@i-reporter.ouszx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' , {useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connect("mongodb://localhost:27017/task-tracker", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (err) => {
  console.error(err);
});
db.once("open", () => {
  console.log("DB started successfully connected");
});
//for hosted database
// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://franckie:<process.env.PASSWORD>@i-reporter.ouszx.mongodb.net/i-reporter?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//     console.log('connected to database')
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
app.listen("5000", () => console.log("listening on port 5000"));
