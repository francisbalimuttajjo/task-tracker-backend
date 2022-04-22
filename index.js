const app = require("./app");
const mongoose = require("mongoose");

require("dotenv").config({});

console.log(app.get("env"));

mongoose.connect(process.env.URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (err) => {
  console.log(err);
});

db.once("open", () => {
  console.log("DB started successfully connected");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`listening on  port ${PORT}  `));
