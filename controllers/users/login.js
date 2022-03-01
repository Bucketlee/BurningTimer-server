const User = require("../../models/user");

module.exports = async function login(req, res) {
  try {
    const userInfo = await User.findOne({ username: req.body.username });

    // check username
    if (!userInfo) {
      return res.status(401).send({ message: "Please, Check your ID" });
    }

    // check password
    const isValidPassword = userInfo.password === req.body.password;
    if (!isValidPassword) {
      return res.status(401).send({ message: "Please, Check your password" });
    }

    // next phase
    const { username } = userInfo;

    return res
      .status(200)
      .json({ userInfo: { username }, message: "Ok" });
  } catch (err) {
    return res.status(500).send({ message: "Unexpected server error" });
  }
};
