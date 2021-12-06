const express = require("express");
const router = express.Router();
const userController = require("../Controllers/User");
const auth = require("../controllers/auth");

router.route("/users/register").post(userController.register);
router.route("/users/forgotPassword").post(userController.forgotPassword);
router.route("/users/passwordReset/:token").post(userController.resetPassword);
router.route("/users/login").post(auth.isActive, auth.login);
router
  .route("/users/activate-account/:token")
  .get(userController.confirmAccount);
module.exports = router;
