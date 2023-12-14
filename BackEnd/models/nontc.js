const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const nontcSchema = new Schema({
  name: { type: String, required: true },
  number: {type:Number, required:true,minlength: 10 },
  location: { type: String, required: true },
});

module.exports = mongoose.model('NonTechnical', nontcSchema);
