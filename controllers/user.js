const User = require("../model/User");
const crypto = require("crypto");
const multer = require("multer");
const sharp = require("sharp");
const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");
const Email = require("../utils/Email");
const {
  createToken,
  signToken,
  cookieOptions,
  sendResponse,
} = require("../utils/fns");

// //uploading profile picture or photo
const multerStorage = multer.memoryStorage();
//filtering out no images
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new appError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
// //uploading image
exports.uploadPhoto = upload.single("photo");

//resizing photo
exports.resizePhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user._id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});

//profile photo ends
exports.update = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { photo: req.file.filename },
    { new: true, runValidators: true }
  );

  sendResponse({ photo: req.file.filename }, 200, req, res);
});
exports.resetPassword = catchAsync(async (req, res, next) => {
  const { password, passwordConfirm } = req.body;

  const Token = createToken(req.params.token);

  const user = await User.findOne({
    Token,
    expiresIn: { $gt: Date.now() },
  }).select("+password");

  if (!user) return next(new appError("token doesnt exist or is expired", 400));
  if (!password || !passwordConfirm)
    return next(new appError("please provide passwords", 400));

  user.Token = undefined;
  user.expiresIn = undefined;
  (user.passwordChangedAt = Date.now()),
    (user.password = password),
    (user.passwordConfirm = passwordConfirm),
    await user.save();
  const token = signToken(user._id);

  res.cookie(`auth`, token, cookieOptions);
  sendResponse("passwordChanged", 200, req, res);
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  if (!req.body.email)
    return next(new appError("please provide an email", 400));

  const activationToken = crypto.randomBytes(32).toString("hex");
  const Token = createToken(activationToken);
  const user = await User.findOneAndUpdate(
    { email: req.body.email },
    { Token, expiresIn: new Date(Date.now() + 10 * 60 * 1000) }
  );

  if (!user)
    return next(new appError("account doesnt exist,please signUp", 400));
  try {
    const url = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/users/passwordReset/${activationToken}`;

    ///sending the emails
    await new Email(user, url).sendPasswordReset();

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
    photo: "default.jpg",
    password: password.split(" ").join(""),
    passwordConfirm: passwordConfirm.split(" ").join(""),
    Token,
  });

  await newUser.save();
  try {
    const url = `${req.protocol}://${req.get(
        "host"
      )}/api/v1/users/activate-account/${activationToken}`;   

    await new Email(newUser, url).sendWelcome();
  } catch (err) {
    await User.findOneAndDelete({ email });
    return next(new appError("oops,something is not right,try again", 400));
  }

  sendResponse("Account created", 200, req, res);
});
exports.confirmAccount = catchAsync(async (req, res, next) => {
  const Token = createToken(req.params.token);
  const user = await User.findOne({ Token });

  if (!user) return next(new appError("invalid token", 401));
  user.Token = undefined;
  user.active = true;
  await user.save();
  const token = signToken(user._id);
  //sigining in the user
  res.cookie(`auth`, token, cookieOptions);
  //sending response to the client //
  sendResponse("account activated", 200, req, res);
});
