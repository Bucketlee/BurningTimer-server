const express = require("express");
const cors = require("cors");
require("dotenv").config();

const router = require("./routes");
const connectDatabase = require("./database/mongoose");

process.env.NODE_ENV !== 'test' ? connectDatabase(false) : connectDatabase(true);

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api", router);

const port = process.env.PORT || 4000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`서버가 ${port}번으로 연결되었습니다.`);
  });
}

module.exports = app;
