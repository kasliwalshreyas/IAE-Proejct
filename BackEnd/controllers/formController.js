const jobSc = require("../models/formModel");
const jobCurrSc = require("../models/currformModel");
const HttpError = require("../models/http-error");

// const ScoreDetails = async (req, res) => {
//   const { user } = req.body;
//   const id = ObjectId(user);
//   // console.log(id)
//   const dets = await JobModel.find({ _id: id });
//   // console.log(dets)
//   if (dets) {
//     res.json(dets);
//   } else {
//     res.json("No user found");
//   }
// };

const addJobScore = async (req, res, next) => {
  const { userid, jobScore, companyName } = req.body;
  // console.log(skills)
  let exisitingScore;
  exisitingScore = await jobSc.findOne({
    companyName: companyName,
    userid: userid,
  });
  if (exisitingScore) {
    const error = new HttpError(
      "Job exists already, please add different job",
      422
    );
    return next(error);
  } else {
    exisitingScore = new jobSc({
      userid: userid,
      jobScore: jobScore,
      companyName: companyName,
    });
    try {
      await exisitingScore.save();
    } catch (err) {
      console.log(exisitingScore);
      const error = new HttpError(
        "Adding job score failed, please try again later.",
        500
      );
      return next(error);
    }
  }
};

const addCurrJobScore = async (req, res, next) => {
  const { userid, jobCurrScore, companyName } = req.body;
  console.log(req.body);
  let exisitingScore;
  exisitingScore = await jobCurrSc.findOne({
    companyName: companyName,
    userid: userid,
  });
  if (exisitingScore) {
    const error = new HttpError(
      "Job exists already, please add different job",
      422
    );
    return next(error);
  } else {
    exisitingScore = new jobCurrSc({
      userid: userid,
      jobCurrScore: jobCurrScore,
      companyName: companyName,
    });
    try {
      await exisitingScore.save();
    } catch (err) {
      console.log(exisitingScore);
      const error = new HttpError(
        "Adding job score failed, please try again later.",
        500
      );
      return next(error);
    }
  }

  // const updatedJobScore = await jobSc.findOne({ userid: userid });
  // res.json({ jobScore: updatedJobScore });
};

const getJobScore = async (req, res, next) => {
  const { userid } = req.body;
  const getjobsscore = await jobSc.find({ userid: userid });
  let scorearray = [];
  for (let i = 0; i < getjobsscore.length; i++) {
    scorearray.push(getjobsscore[i].jobScore);
  }
  res.json(scorearray);
};

const getCurrJobScore = async (req, res, next) => {
  const { userid } = req.body;
  const getcurrjobsscore = await jobCurrSc.find({ userid: userid });
  let scorearray = [];
  for (let i = 0; i < getcurrjobsscore.length; i++) {
    scorearray.push(getcurrjobsscore[i].jobCurrScore);
  }
  res.json(scorearray);
};

exports.addJobScore = addJobScore;
exports.getJobScore = getJobScore;
exports.getCurrJobScore = getCurrJobScore;
exports.addCurrJobScore = addCurrJobScore;
