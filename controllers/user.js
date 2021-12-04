const path = require("path");
const User = require("../model/User");
const jwt = require("jsonwebtoken");

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
 const cookieOptions= {
           secure: process.env.NODE_ENV !== "development",
        //   secure: false,
          httpOnly: true,
          expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 1000
          ),
        };

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
   
    const value = signToken(user._id);
    const token=`Bearer ${value}`
    res.cookie(`authToken`,token,cookieOptions );
   
    res.status(200).json({
      status: "success",
      data: {
        msg: "login successfull",
        user: user.firstName,
        token,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

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

