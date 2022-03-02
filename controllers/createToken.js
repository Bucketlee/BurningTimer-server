const { sign } = require("jsonwebtoken");
require("dotenv").config();

module.exports = function createAccessToken({ username }) {
  return sign({ username }, process.env.ACCESS_SECRET, {
    expiresIn: "1d",
  });
};
