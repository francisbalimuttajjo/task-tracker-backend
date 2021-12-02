const path = require("path");
const User = require("../model/User");
const jwt = require("jsonwebtoken");

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, passwordConfirm } = req.body;
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      passwordConfirm,
    });
    res.status(200).json({
      status: "success",
      user,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({
        status: "fail",
        msg: "please fill all fields",
      });
    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return res.status(400).json({
        status: "fail",
        msg: "user doesnt exist,please signUp",
      });
    // console.log(user);
    const verify = await user.correctPassword(password, user.password);
    // console.log(verify);
    if (!verify)
      return res.status(400).json({
        status: "fail",
        msg: "please,provide valid credentials ",
      });
    //console.log("expire", process.env);
    const token = signToken(user._id);
    // console.log("token", token);
    res.status(200).json({
      status: "success",
      data: {
        msg: "login successfull",
        user: user.firstName,
        token: `Bearer ${token}`,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
