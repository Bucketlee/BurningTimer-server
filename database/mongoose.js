function connectDatabase() {
  const mongoose = require("mongoose");
  mongoose.connect(process.env.URI);
}

module.exports = connectDatabase;
