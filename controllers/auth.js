const User = require("../model/User");
// const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");
const { signToken, cookieOptions, sendResponse } = require("../utils/fns");

// const signToken = (id) =>
//   jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRES_IN,
//   });
// const cookieOptions = {
//   secure: process.env.NODE_ENV !== "development",

//   httpOnly: true,
//   expires: new Date(
//     Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 1000
//   ),
// };
// const sendResponse = (data, statusCode, req, res) =>
//   res.status(statusCode).json({
//     status: "success",
//     data,
//   });

exports.isActive = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new appError("please fill all fields", 400));

  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new appError("user doesnt exist,please signUp", 400));

  // console.log(user);
  const verify = await user.correctPassword(password, user.password);
  // console.log(verify);
  if (!verify)
    return next(new appError("please,provide valid credentials ", 400));

  if (user.active == false)
    return next(new appError("account not active", 400));
  //adding user to request body
  req.user = user;
  next();
});
exports.login = catchAsync(async (req, res, next) => {
  //getting user from request body
  const user = req.user;
  const value = signToken(user._id);
  const token = `Bearer ${value}`;
  res.cookie(`authToken`, token, cookieOptions);
  const data = { message: "login successfull", user: user.firstName, token };
  sendResponse(data, 200, req, res);
});
