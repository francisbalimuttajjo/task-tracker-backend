const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config({ debug: process.env.DEBUG });

console.log(app.get("env"));

mongoose.connect(process.env.DB_LOCAL, {
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
