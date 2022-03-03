const Category = require("../../models/category");
const User = require("../../models/user");

module.exports = async function getCategories(req, res) {
  const username = req.token;

  try {
    const user = await User.findOne({ username });
    const categories = await Category.find({ userId: user._id });
    return res.status(200).send({ data: categories, message: "Ok" });
  } catch (err) {
    return res.status(500).send({ message: "Unexpected server error" });
  }
};
