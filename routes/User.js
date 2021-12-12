const express = require("express");
const router = express.Router();
const userController = require("../Controllers/User");
const auth = require("../controllers/auth");

router.route("/users/changePassword").post(auth.isAllowed, auth.updatePassword);
router.route("/users/forgotPassword").post(userController.forgotPassword);
router.route("/users/passwordReset/:token").post(userController.resetPassword);
router.route("/users/login").post(auth.login);
router.route("/users/auth").get(auth.isAuthenticated);
router.route("/users/logout").get(auth.logOutHandler);
router.route("/users/register").post(userController.register);
router
  .route("/users/activate-account/:token")
  .get(userController.confirmAccount);
router
  .route("/users/update")
  .post(
    auth.isAllowed,
    userController.uploadPhoto,
    userController.resizePhoto,
    userController.update
  );
module.exports = router;
