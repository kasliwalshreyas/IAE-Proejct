const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const NontcModel = require("../models/nontc");
const express = require("express");
const axios = require("axios");
const dataset= require('../JsonData/unskilled.json')
const register = async(req,res,next)=>{
    const { name, mobile, location } = req.body;
    console.log(req.body,'dgkjl')
    let existingUser;
    try {
      existingUser = await NontcModel.findOne({ number:mobile});
    } catch (err) {
      const error = new HttpError(
        "Signing up failed, please try again later.",
        500
      );
      return next(error);
    }
    if (existingUser) {
        const error = new HttpError(
          "User exists already, please login instead.",
          422
        );
        return next(error);
      }

    const created = new NontcModel({
        name: name,
        number: mobile,
        location: location,
      });
      console.log(created)
      try {
        await created.save();
        // console.log(newuser,'no new user error')
      } catch (err) {
        console.log("saving error");
        const error = new HttpError(
          "Signing up failed, please try again later.",
          500
        );
        return next(error);
      }
    // console.log(createdUser)
}

const ologin = async(req,res,next)=>
{
// console.log(req.body.number)
const {number,otp} =req.body
let existingUser;
try {
  existingUser = await NontcModel.findOne({ number:number});
} catch (err) {
  const error = new HttpError(
    "Signing up failed, please try again later.",
    500
  );
  return next(error);
}
if (existingUser && otp==123456) {
    res.json(existingUser)
   
}
else{
    const error = new HttpError(
        "Sign in failed, please try again later, wrong phone number",
        500
      );
      return next(error);
}
}
const showjobs = (req,res,next)=>
{
  const {clicked} = req.body
  // console.log(dataset)
  // console.log(showjobs)
  let small = clicked.toLowerCase()
const response =  dataset.filter(dat =>dat.skills===clicked || dat.skills===small)

console.log(response)

  res.json(response)

}
exports.register = register;
exports.ologin = ologin;
exports.showjobs = showjobs;