const mongoose = require("mongoose");
const user = require("./user");
const category = require("./category");
const label = require("./label");

const Schema = mongoose.Schema;

const task = new Schema(
  {
    userId: { type: String, required: true, ref: user },
    categoryId: { type: String, required: true, ref: category },
    labelId: { type: String, required: true, ref: label },
    startTimestamp: Date,
    endTimestamp: Date,
    pauseAndRestarts: Array,
    goalTime: String,
    playTime: String,
    memo: String,
    distraction: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", task);
