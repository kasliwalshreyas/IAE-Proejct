const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const currformSchema = new Schema({
  userid: { type: String, required: true },
  jobCurrScore: { type: Number, required: true },
  companyName: { type: String, required: true },
});

module.exports = mongoose.model("currformModel", currformSchema);
