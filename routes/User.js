const express = require("express");
const router = express.Router();
const userController = require("../Controllers/User");

router.route("/users/register").post(userController.register);
router.route("/users/login").post(userController.login);
module.exports = router;
