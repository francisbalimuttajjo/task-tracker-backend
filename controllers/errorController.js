const AppError = require("../utils/appError");

//managing invalid id
const sendCastError = (err) => {
  const message = `Invalid input at ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

///handling duplicate fields
const handleDuplicates = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = ` ${value} already exists. Please use another value!`;
  return new AppError(message, 400);
};

//expired token
const expiredTokenError = () =>
  new AppError("token already expired,log in again", 401);
//json web tokenAccount
const jsonwebError = () => new AppError("please sign in", 401);
//validation errors

const validationError = (err) => {
  //looping through objects
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

//managing errors during development
const developmentError = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};
const productionError = (err, res) => {
  //error we expect to happen in future
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    return res.status(500).json({
      status: "error",
      message: "sorry,try again later",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    developmentError(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = err;

    if (error.name === "CastError") error = sendCastError(error);
    if (error.code === 11000) error = handleDuplicates(error);
    if (error.name === "ValidationError") error = validationError(error);
    if (err.name === "JsonWebTokenError") error = jsonwebError(error);
    if (err.name === "TokenExpiredError") error = expiredTokenError(error);

    productionError(error, res);
  }
};
