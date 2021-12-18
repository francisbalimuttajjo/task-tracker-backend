const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config({ debug: process.env.DEBUG });

console.log(app.get("env"));

mongoose.connect(
  // process.env.URL
  process.env.DB_LOCAL
  , {
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



app.listen(5000, () => console.log("listening on port 5000"));
