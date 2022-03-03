const Task = require("../../models/task");

module.exports = async function updateTask(req, res) {
  try {
    const { taskId } = req.params;
    const { memo, distraction } = req.body;

    if (memo) {
      await Task.updateOne({ _id: taskId }, { memo });
    }

    if (distraction) {
      await Task.updateOne({ _id: taskId }, { distraction });
    }

    return res.status(200).send({ message: "Ok" });
  } catch {
    return res.status(500).send({ message: "Unexpected server error" });
  }
};
