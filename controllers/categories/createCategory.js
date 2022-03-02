const Category = require("../../models/category");
const User = require("../../models/user");

module.exports = async function createCategory(req, res) {
  const username = req.token;
  const { name, priority } = req.body;

  if (!name || !priority) {
    return res.status(400).send({ message: "Request is incorrect" });
  }

  try {
    // category 중복 확인
    const user = await User.findOne({ username });
    console.log("user", user);
    const data = await Category.findOne({ $and: [{ userId: user._id }, { name: name }] });

    if (data && data.priority !== 0) {
      return res.status(400).send({ message: "This category is already exists" });
    }

    // 카테고리 우선순위 확보
    await Category.updateMany({ $and: [{ userId: user._id }, { priority: { $gte: priority } }] }, { $inc: { priority: 1 } });

    // 카테고리 생성 (이미 있는데 활성화되어있지 않을 시 활성화 시키고, 없다면 생성)
    if (data && data.priority === 0) {
      await Category.updateOne({ $and: [{ userId: user._id }, { name: name }] }, { priority: priority });
    } else {
      await Category.create({ name, priority, userId: user._id });
    }
    return res.status(200).send({ message: "Ok" });
  } catch (err) {
    return res.status(500).send({ message: "Unexpected server error" });
  }
};
