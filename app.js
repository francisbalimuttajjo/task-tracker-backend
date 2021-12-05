const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const morgan = require("morgan")
const cors = require("cors");
const path = require("path");
const TaskRouter = require("./routes/Task");
const userRouter = require("./routes/User");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());

app.set("views", path.join(__dirname, "views"));
// Development logging
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }

app.use("/api/v1", TaskRouter);
app.use("/api/v1", userRouter);
app.get('/',(req, res)=>res.render('welcome.pug'))

app.all("*", (req, res, next) => {
    // res.send('route not found')
    return next(
      new AppError(`${req.originalUrl} is not available on the server`, 404)
    );
  });
  
  app.use(globalErrorHandler);

module.exports = app;
