const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const userModel = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "enter firstname"],
    
  },
  lastName: {
    type: String,
    required: [true, "enter last name"],
   
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: [true, "email already exists"],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },

  // photo: String,

  //  role: {
  //  type: String,
  //  enum: ['user',  'admin'],
  //  default: 'user'
  // },

  active: {
    type: Boolean,
    default: false,
  },

  password: {
    type: String,
    required: [true, "password is required"],
   
    select: false,
  },
  passwordConfirm: {
    type: String,
    
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userModel.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

//comparing passwords
userModel.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);

  return x;
};
const users = mongoose.model("users", userModel);
module.exports = users;
