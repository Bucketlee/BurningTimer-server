const Label = require("../../models/label");
const User = require("../../models/user");

module.exports = async function getLabels(req, res) {
  const username = req.token;

  try {
    const user = await User.findOne({ username });
    const labels = await Label.find({ userId: user._id });
    return res.status(200).send({ data: labels, message: "Ok" });
  } catch (err) {
    return res.status(500).send({ message: "Unexpected server error." });
  }
};
