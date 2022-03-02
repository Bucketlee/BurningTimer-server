function connectDatabase(isTest) {
  const mongoose = require("mongoose");
  isTest ? mongoose.connect(process.env.TEST_URI) : mongoose.connect(process.env.URI);
}

module.exports = connectDatabase;
