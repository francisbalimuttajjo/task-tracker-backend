const app = require("./app")
const mongoose = require("mongoose");
require("dotenv").config({ debug: process.env.DEBUG });

console.log(app.get("env"));

mongoose.connect(
   process.env.URL
   //process.env.DB_LOCAL
   ,
 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
db.on("error", (err) => {
  // console.error(err);
  // console.error('something is wrog dat');
});
db.once("open", () => {
  console.log("DB started successfully connected");
});

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`listening on  port ${PORT}  `));
