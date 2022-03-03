const Task = require("../../models/task");
const User = require("../../models/user");

module.exports = async function getTasks(req, res) {
  const username = req.token;

  try {
    const user = await User.findOne({ username });

    const tasks = await Task.find({ userId: user._id });
    return res.status(200).send({ data: tasks, message: "Ok" });
  } catch {
    return res.status(500).send({ message: "Unexpected server error" });
  }
};
