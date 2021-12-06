const jwt = require("jsonwebtoken");
const crypto = require("crypto");
exports.signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
exports.cookieOptions = {
  secure: process.env.NODE_ENV !== "development",

  httpOnly: true,
  expires: new Date(
    Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 1000
  ),
};
exports.createToken = (token) => {
  const Token = crypto.createHash("sha256").update(token).digest("hex");
  return Token;
};
exports.sendResponse = (data, statusCode, req, res) =>
  res.status(statusCode).json({
    status: "success",
    data,
  });
