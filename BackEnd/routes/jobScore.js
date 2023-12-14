const express = require("express");
// const { check } = require('express-validator');
const router = express.Router();
const formController = require("../controllers/formController");

router.post("/addJobScore", formController.addJobScore);
router.post("/addCurrJobScore", formController.addCurrJobScore);
router.post("/getJobScore", formController.getJobScore);
router.post("/getCurrJobScore", formController.getCurrJobScore);
// router.post("/addJobScore",addJobScore.addJobScore);

module.exports = router;
