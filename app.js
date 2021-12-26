const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
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
app.use(mongoSanitize());
app.use(cookieParser());

app.use(helmet());
app.use(express.json({ limit: "10kb" }));
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});

app.use("/api", limiter);
// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1", TaskRouter);
app.use("/api/v1", userRouter);
app.get("/", (req, res) => res.render("passwordReset.pug"));

app.all("*", (req, res, next) => {
  
  return next(
    new AppError(`${req.originalUrl} is not available on the server`, 404)
  );
});

app.use(globalErrorHandler);

module.exports = app;
