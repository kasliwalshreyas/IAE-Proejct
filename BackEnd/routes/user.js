const express = require("express");
// const { check } = require('express-validator');
const router = express.Router();
const singleUpload = require("../middlewares/multer");
const usersController = require("../controllers/userController");

router.post("/signup", usersController.signup);
router.post("/login", usersController.login);
router.post("/loginOTP", usersController.loginOTP);

router.post("/details", usersController.details);
router.post("/updateProfile", usersController.updateProfile);
router.post(
  "/updateProfilePicture",
  singleUpload,
  usersController.updateProfilePicture
);
module.exports = router;
