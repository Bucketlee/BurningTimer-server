const User = require("../../models/user");

module.exports = async function signup(req, res) {
  const { username, password, email } = req.body;

  // check email invalid
  function checkEmailValidity(email) {
    const exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    return exptext.test(email);
  }

  if (!checkEmailValidity(email)) {
    return res.status(400).send({ message: "Email is invalid" });
  }

  // check username
  const isUsernameExist = await User.findOne({ username });
  if (isUsernameExist) {
    return res.status(400).send({ message: "ID's already exists" });
  }

  // check email
  const isEmailExist = await User.findOne({ email });
  if (isEmailExist) {
    return res.status(400).send({ message: "Email's already exists" });
  }

  // create user
  try {
    await User.create({ username, password, email });
    const userInfo = { username };
    return res.status(201).send({ userInfo, message: "Created" })
  } catch (err) {
    return res.status(500).send({ message: "Unexpected server error" });
  }
};
