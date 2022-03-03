const Label = require("../../models/label");
const User = require("../../models/user");

module.exports = async function createLabel(req, res) {
  const username = req.token;
  const { categoryId, name, priority } = req.body;

  if (!categoryId || !name || !priority) {
    return res.status(400).send({ message: "Request is incorrect" });
  }

  try {
    // Label 중복 확인 (같은 카테고리 내)
    const user = await User.findOne({ username });
    const data = await Label.findOne({ $and: [{ userId: user._id }, { categoryId }, { name: name }] });

    if (data && data.priority !== 0) {
      return res.status(400).send({ message: "This label is already exists" });
    }

    // 라벨 우선순위 확보
    await Label.updateMany({ $and: [{ userId: user._id }, { categoryId }, { priority: { $gte: priority } }] }, { $inc: { priority: 1 } });

    // 라벨 생성 (이미 있는데 활성화되어있지 않을 시 활성화 시키고, 없다면 생성)
    if (data && data.priority === 0) {
      await Label.updateOne({ $and: [{ userId: user._id }, { name: name }] }, { priority: priority });
    } else {
      await Label.create({ categoryId, name, priority, userId: user._id });
    }
    return res.status(200).send({ message: "Ok" });
  } catch (err) {
    return res.status(500).send({ message: "Unexpected server error" });
  }
};
