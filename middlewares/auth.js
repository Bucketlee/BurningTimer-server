const { verify } = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  // 헤더 내 토큰 확인
  const token = req.headers["authorization"].split(" ")[1];

  // 토큰이 없을 경우 오류
  if (!token) {
    return res.status(401).send({ message: "Not Authorized (No token)" });
  }

  // token을 username으로 변경
  function getTokenFromHeader(token) {
    const key = process.env.ACCESS_SECRET;

    return new Promise((resolve, reject) => {
      verify(token, key, (err, decoded) => {
        if (err) {
          return reject(err);
        }

        resolve(decoded);
      });
    });
  }

  try {
    const { username } = await getTokenFromHeader(token);

    if (username) {
      req.token = username;
      next();
    }
  } catch (err) {
    return res.status(401).send({ message: "Not Authorized (No username in token" });
  }
};
