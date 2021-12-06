// const path = require("path");
const User = require("../model/User");
const crypto = require("crypto");
const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");
const Email = require("../utils/Email");
const { createToken, sendResponse } = require("../utils/fns");

exports.resetPassword = catchAsync(async (req, res, next) => {
  const { password, passwordConfirm } = req.body;
  const Token = createToken(req.params.token);
  console.log("token", Token);
  const user = await User.findOne({
    Token,
    expiresIn: { $gt: Date.now() },
  }).select("+password");
  // console.log(user);
  if (!user) return next(new appError("token doesnt exist or is expired", 400));
  if (!password || !passwordConfirm)
    return next(new appError("please provide passwords", 400));

  user.Token = undefined;
  user.expiresIn = undefined;
  (user.passwordChangedAt = Date.now()),
    (user.password = password),
    (user.passwordConfirm = passwordConfirm),
    await user.save();

  sendResponse("passwordChanged", 200, req, res);
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  if (!req.body.email)
    return next(new appError("please provide an email", 400));
  //////
  const activationToken = crypto.randomBytes(32).toString("hex");
  const Token = createToken(activationToken);

  //////
  const user = await User.findOneAndUpdate(
    { email: req.body.email },
    { Token, expiresIn: new Date(Date.now() + 10 * 60 * 1000) }
  );
  /////
  if (!user)
    return next(new appError("account doesnt exist,please signUp", 400));
  try {
    const url = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/users/passwordReset/${activationToken}`;

    //to be implemented
    await new Email(user, url).sendPasswordReset();
    // console.log(url);
    sendResponse("activation link sent to ur email", 200, req, res);
  } catch (err) {
    user.Token = undefined;
    user.expiresIn = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new appError("There was an error sending the email. Try again later!"),
      500
    );
  }
});

exports.register = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, password, passwordConfirm } = req.body;
  ///
  if (!firstName || !lastName || !email || !password || !passwordConfirm)
    return next(new appError("please fill all fields", 400));
  ///
  let user = await User.findOne({ email });
  if (user) return next(new appError("account exists,please login", 401));
  //
  const activationToken = crypto.randomBytes(32).toString("hex");
  const Token = createToken(activationToken);
  //
  const newUser = new User({
    //disabling white spaces as inputs
    firstName: firstName.split(" ").join(""),
    lastName: lastName.split(" ").join(""),
    email,
    password: password.split(" ").join(""),
    passwordConfirm: passwordConfirm.split(" ").join(""),
    Token,
  });

  await newUser.save();

  const url = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/activate-account/${activationToken}`;
  // console.log(url);

  await new Email(newUser, url).sendWelcome();
  sendResponse(newUser, 200, req, res);
});
exports.confirmAccount = catchAsync(async (req, res, next) => {
  const Token = createToken(req.params.token);
  const user = await User.findOne({ Token });

  if (!user) return next(new appError("invalid token", 401));
  user.Token = undefined;
  user.active = true;
  await user.save();
  //response
  sendResponse("account activated", 200, req, res);
});
