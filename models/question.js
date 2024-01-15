const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  questionedToWeb: {
    type: String,
    required: true,
  },
  questionDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Question", questionSchema);
