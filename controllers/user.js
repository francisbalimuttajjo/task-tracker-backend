const path = require("path");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");
const Email = require("../utils/Email");

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
const createToken = (token) => {
  const Token = crypto.createHash("sha256").update(token).digest("hex");
  return Token;
};
// const sendResponse = (data) => {
//   return (req, res,next) =>
//     res.status(200).json({
//       status: "success",
//       data,
//     });

// };
const cookieOptions = {
  secure: process.env.NODE_ENV !== "development",

  httpOnly: true,
  expires: new Date(
    Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 1000
  ),
};

exports.register = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, password, passwordConfirm } = req.body;
  let user = await User.findOne({ email });
  if (user) return next(new appError("account exists,please login", 401));
  const activationToken = crypto.randomBytes(32).toString("hex");
  const Token = createToken(activationToken);
  const newUser = new User({
    firstName,
    lastName,
    email,
    password,
    passwordConfirm,
    Token,
  });

  await newUser.save();

  const url = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/activate-account/${activationToken}`;
  console.log(url);

  await new Email(newUser, url).sendWelcome();
  // sendResponse(registeredUser);
  res.status(200).json({
    status: "success",
    data: newUser,
  });
});
exports.confirmAccount = catchAsync(async (req, res, next) => {
  const Token = createToken(req.params.token);
  const user = await User.findOne({ Token });

  if (!user) return next(new appError("invalid token", 401));
  user.Token = undefined;
  user.active = true;
  await user.save();
  //response
  res.status(200).json({
    status: "success",
    data: "account activated",
  });
});
exports.login = catchAsync(async (req, res, next) => {
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
  const value = signToken(user._id);
  const token = `Bearer ${value}`;
  ///
  res.cookie(`authToken`, token, cookieOptions);
  res.status(200).json({
    status: "success",
    data: {
      message: "login successfull",
      user: user.firstName,
      token,
    },
  });
});

// const path = require("path");
// const User = require("../model/User");
// const jwt = require("jsonwebtoken");

// const signToken = (id) =>
//   jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRES_IN,
//   });

// exports.register = async (req, res) => {
//   try {
//     const { firstName, lastName, email, password, passwordConfirm } = req.body;
//     const user = await User.create({
//       firstName,
//       lastName,
//       email,
//       password,
//       passwordConfirm,
//     });
//     res.status(200).json({
//       status: "success",
//       user,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({
//       status: "fail",
//       message: err.message,
//     });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password)
//       return res.status(400).json({
//         status: "fail",
//         msg: "please fill all fields",
//       });
//     const user = await User.findOne({ email }).select("+password");
//     if (!user)
//       return res.status(400).json({
//         status: "fail",
//         msg: "user doesnt exist,please signUp",
//       });
//     // console.log(user);
//     const verify = await user.correctPassword(password, user.password);
//     // console.log(verify);
//     if (!verify)
//       return res.status(400).json({
//         status: "fail",
//         msg: "please,provide valid credentials ",
//       });

//     const token = signToken(user._id);
//     // res.cookie(`Cookie token name2`, `encrypted cookie string Value`);
//     // res.send(req.cookies);
//     // res.send('Cookie have been saved successfully');

//     res.cookie("cookie", token, {
//       // secure: process.env.NODE_ENV !== "development",
//       secure: false,
//       httpOnly: true,
//       expires: new Date(
//         Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 1000
//       ),
//     });
//     console.log("cookie", req.cookies);
//     res.status(200).json({
//       status: "success",
//       data: {
//         msg: "login successfull",
//         user: user.firstName,
//         token: `Bearer ${token}`,
//       },
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: "fail",
//       message: err.message,
//     });
//   }
// };
