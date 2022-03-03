const Task = require("../../models/task");
const User = require("../../models/user");
const Label = require("../../models/label");

module.exports = async function createTask(req, res) {
  const username = req.token;

  const user = await User.findOne({ username });
  const {
    categoryId,
    labelId,
    startTimestamp,
    endTimestamp,
    pauseAndRestarts,
    goalTime,
    playTime,
    memo,
    distraction,
  } = req.body;

  if (!categoryId || !labelId) {
    return res.status(400).send({ message: "Request is incorrect" });
  }

  try {
    // task 추가
    await Task.create({
      userId: user._id,
      categoryId,
      labelId,
      startTimestamp,
      endTimestamp,
      pauseAndRestarts,
      goalTime,
      playTime,
      memo,
      distraction,
    });
    return res.status(200).send({ message: "Ok" });
  } catch {
    return res.status(500).send({ message: "Unexpected server error" });
  }
};
