const { sign } = require("jsonwebtoken");

module.exports = function createAccessToken({ username }) {
  return sign({ username }, process.env.ACCESS_SECRET, {
    expiresIn: "1d",
  });
};
