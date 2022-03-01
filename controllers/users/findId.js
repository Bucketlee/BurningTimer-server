const User = require("../../models/user");

module.exports = async function findId(req, res) {
  try {
    const { email } = req.body;
    const userInfo = await User.findOne({ email });

    // email check
    if (!userInfo) {
      return res.status(400).send({ message: "Not found ID with that email" });
    }

    // next phase
    const { username } = userInfo;
    return res.status(200).send({ userInfo: { username }, message: "Ok" });
  } catch (err) {
    return res.status(500).send({ message: "Unexpected server error" });
  }
};
