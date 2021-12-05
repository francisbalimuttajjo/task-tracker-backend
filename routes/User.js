const express = require("express");
const router = express.Router();
const userController = require("../Controllers/User");

router.route("/users/register").post(userController.register);
router.route("/users/login").post(userController.login);
router.route("/users/activate-account/:token").get(userController.confirmAccount);
module.exports = router;
