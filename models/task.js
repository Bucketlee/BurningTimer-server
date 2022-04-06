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
    goalTime: Number,
    playTime: Number,
    memo: Object,
    distraction: Object,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", task);
