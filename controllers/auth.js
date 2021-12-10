const User = require("../model/User");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");
const { signToken, cookieOptions, sendResponse } = require("../utils/fns");

// exports.isActive = catchAsync(async (req, res, next) => {
//   console.log("checking");
//   const { email, password } = req.body;
//   if (!email || !password)
//     return next(new appError("please fill all fields", 400));

//   const user = await User.findOne({ email }).select("+password");
//   if (!user) return next(new appError("user doesnt exist,please signUp", 400));

//   // console.log(user);
//   const verify = await user.correctPassword(password, user.password);
//   // console.log(verify);
//   if (!verify)
//     return next(new appError("please,provide valid credentials ", 400));

//   if (user.active == false)
//     return next(new appError("account not active", 400));
//   //adding user to request body
//   req.user = user;
//   console.log("user", user);
//   next();
// });
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

  if (!user.active) return next(new appError("account not active", 400));
  //getting user from request body
  // const user = req.user;
  const token = signToken(user._id);

  // const token = `Bearer ${value}`;
  res.cookie(
    `auth`,
    token,

    cookieOptions
  );
  const data = { message: "login successfull", user, token };
  sendResponse(data, 200, req, res);
  // req.user = user;
  // next();
});
exports.logOutHandler = catchAsync(async (req, res, next) => {
  // console.log('cooke',req.headers.cookie)
  res.cookie("auth", "ooops loggedOut", { expiresIn: 2000 });
  sendResponse("logged out successfully", 200, req, res);
});
exports.isAuthenticated = catchAsync(async (req, res, next) => {
  let token;
  //  console.log(req.headers.cookie); bnn
  //checking if token exists on the response headers
  if (req.headers.cookie && req.headers.cookie.startsWith("auth")) {
    token = req.headers.cookie.split("=")[1];
    // console.log('token',token);
  } else if (!req.headers.cookie || !req.headers.cookie.startsWith("auth")) {
    return next(
      new appError("You are not logged in! Please log in to get access.", 401)
    );
  }

  //verifying if the right token
  const verify = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(verify.id);
  // console.log(user);

  //getting the user for that token
  if (!user) return next(new appError("user doesnt exist", 400));
  if (user.changedPasswordAfter(verify.iat)) {
    return next(
      new appError("User recently changed password! Please log in again.", 401)
    );
  }
  if (!user.active) return next(new appError("account deleted", 401));
  req.user = user;
  //sending response
  sendResponse(user, 200, req, res);

  // console.log(verify);

  // next();
});
