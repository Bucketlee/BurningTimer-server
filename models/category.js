const mongoose = require("mongoose");
const user = require("./user");

const Schema = mongoose.Schema;

const category = new Schema(
  {
    userId: { type: String, required: true, ref: user },
    name: { type: String, required: true },
    priority: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", category);
