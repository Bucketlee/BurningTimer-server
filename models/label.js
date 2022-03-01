const mongoose = require("mongoose");
const user = require("./user");
const category = require("./category");

const Schema = mongoose.Schema;

const label = new Schema(
  {
    userId: { type: String, required: true, ref: user },
    categoryId: { type: String, required: true, ref: category },
    name: { type: String, required: true },
    priority: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Label", label);
