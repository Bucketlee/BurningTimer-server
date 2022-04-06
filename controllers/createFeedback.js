const Feedback = require("../models/feedback");

module.exports = async function createFeedback(req, res) {
  const { email, name, content } = req.body;

  try {
    const data = await Feedback.create({ email, name, content });
    return res.status(200).send({ message: "Ok", data: data });
  } catch (err) {
    return res.status(500).send({ message: "Unexpected server error" });
  }
};
