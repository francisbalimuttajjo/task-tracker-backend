const User = require("../model/User");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");
const { signToken, cookieOptions, sendResponse } = require("../utils/fns");

exports.isAllowed = catchAsync(async (req, res, next) => {
  let token;

  //checking if token exists on the response headers
  if (req.headers.cookie && req.headers.cookie.startsWith("auth")) {
    token = req.headers.cookie.split("=")[1];
   
  } else if (!req.headers.cookie || !req.headers.cookie.startsWith("auth")) {
    return next(
      new appError("You are not logged in! Please log in to get access.", 401)
    );
  }

  //verifying if the right token
  const verify = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(verify.id);
  

  //getting the user for that token
  if (!user) return next(new appError("user doesnt exist", 400));
  if (user.changedPasswordAfter(verify.iat)) {
    return next(
      new appError("User recently changed password! Please log in again.", 401)
    );
  }
  if (!user.active) return next(new appError("account deleted", 401));
  req.user = user;

  next();
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select('+password');
 
  const { currentPassword, password, passwordConfirm } = req.body;
  if (!currentPassword || !password || !passwordConfirm)
    return next(new appError("please fill all fields",400));

      const verify = await user.correctPassword(currentPassword, user.password);
 
  if (!verify)
    return next(new appError("please,provide a valid password ", 400));
    (user.passwordChangedAt = Date.now()),
    (user.password = password),
    (user.passwordConfirm = passwordConfirm),
    await user.save();

    sendResponse('password changed',200,req,res)
});
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new appError("please fill all fields", 400));

  const user = await User.findOne({ email }).select("+password");
 
  if (!user) return next(new appError("please,provide valid credentials ", 400));


  const verify = await user.correctPassword(password, user.password);

  if (!verify)
    return next(new appError("please,provide valid credentials ", 400));

  if (!user.active) return next(new appError("account not active", 400));
  
  const token = signToken(user._id);

  res.cookie(
    `auth`,
    token,

    cookieOptions
  );
  const data = { message: "login successfull", user:{
    firstName:user.firstName,lastName:user.lastName,email:user.email,photo:user.photo
  }, token };

  //sending response
  sendResponse(data, 200, req, res);
});




exports.logOutHandler = catchAsync(async (req, res, next) => {
 
  res.cookie("auth", "ooops loggedOut", { expiresIn: 2000 });
  sendResponse("logged out successfully", 200, req, res);
});

  
