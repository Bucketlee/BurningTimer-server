const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const feedback = new Schema(
  {
    email: String,
    name: String,
    content: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Feedback", feedback);
