const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const UserModel = require("../models/UserModel");
const express = require("express");
const axios = require("axios");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");
const getDataUri = require("../utils/dataUri");
const cloudinary = require("../utils/cloudinary");

const details = async (req, res) => {
  const { user } = req.body;
  const id = ObjectId(user);
  // console.log(id)
  const dets = await UserModel.find({ _id: id });
  // console.log(dets)
  if (dets) {
    res.json(dets);
  } else {
    res.json("No user found");
  }
};
const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { name, email, password, mobile, location } = req.body;
  // console.log(req.body)
  let existingEmail;
  let existingMobile;
  try {
    existingEmail = await UserModel.findOne({ email: email });
    existingMobile = await UserModel.findOne({ mobilenumber: mobile });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  if (existingEmail || existingMobile) {
    const error = new HttpError(
      "User exists already, please login instead.",
      422
    );
    return next(error);
  }

  const createdUser = new UserModel({
    name: name,
    email: email,
    password: password,
    mobilenumber: mobile,
    location: location,
  });
  // console.log(createdUser)
  try {
    const newuser = await createdUser.save();
    // console.log(newuser,'no new user error')
  } catch (err) {
    console.log("saving error");
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  // console.log(req.body)
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  let existingUser;
  try {
    existingUser = await UserModel.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Login failed, check your crednetials or signup.",
      500
    );
    return next(error);
  }
  // console.log(existingUser)
  if (!existingUser) {
    // console.log(password,existingUser.password)
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );

    return next(error);
  } else {
    const pass = await bcrypt.compare(password, existingUser.password);
    // console.log(pass)
    if (!pass) {
      const error = new HttpError(
        "Invalid credentials, could not log you in.",
        401
      );
      return next(error);
    }
  }

  res.json({ user: existingUser.toObject({ getters: true }) });
};

const loginOTP = async (req, res, next) => {
  // console.log(req.body.number)
  const { number, otp } = req.body;
  let existingUser;
  try {
    existingUser = await UserModel.findOne({ mobilenumber: number });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }
  if (existingUser && otp == 123456) {
    res.json(existingUser);
  } else {
    const error = new HttpError(
      "Sign in failed, please try again later, wrong phone number",
      500
    );
    return next(error);
  }
};
const updateProfile = async (req, res, next) => {
  const { userid, name, location } = req.body;
  console.log("name is", name);
  let existingUser;
  existingUser = await UserModel.findOne({ userid: userid });
  if (existingUser) {
    try {
      const result = await UserModel.updateOne(
        // console.log("hgvhgv"),
        { userid: userid },
        {
          $set: {
            name: name,
            location: location,
          },
        }
      );
      // res.json(result)
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }
};

const updateProfilePicture = async (req, res, next) => {
  const file = req.file;
  const { userid } = req.body;
  const fileUri = getDataUri(file);
  const mycloud = await cloudinary.uploader.upload(fileUri.content);
  const cloudimageurl = mycloud.secure_url;
  const updateprofile = await UserModel.updateOne(
    { _id: userid },
    {
      $set: {
        profilePicture: cloudimageurl,
      },
    }
  );
  res.json(updateprofile);
};

exports.signup = signup;
exports.login = login;
exports.loginOTP = loginOTP;
exports.details = details;
exports.updateProfile = updateProfile;
exports.updateProfilePicture = updateProfilePicture;
