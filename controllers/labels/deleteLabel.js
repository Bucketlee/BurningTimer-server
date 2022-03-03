const Label = require("../../models/label");
const User = require("../../models/user");

module.exports = async function deleteLabel(req, res) {
  const username = req.token;
  const { labelId } = req.params;

  if (!labelId) {
    return res.status(400).send({ message: "Not found label ID" });
  }

  try {
    // 삭제 권한이 있는지 확인
    const user = await User.findOne({ username });
    const { categoryId, name, priority } = await Label.findOne({ $and: [{ userId: user._id }, { categoryId }, { _id: labelId }] });

    if (!name) {
      return res.status(400).send({ message: "Not found label with that ID" });
    }

    // 우선순위 업데이트
    await Label.updateMany({ $and: [{ userId: user._id }, { categoryId }, { priority: { $gt: priority } }] }, { $inc: { priority: -1 } })

    // 라벨 비활성화
    await Label.updateOne({ _id: labelId }, { priority: 0 });
    return res.status(200).send({ message: "Ok" });
  } catch (err) {
    return res.status(500).send({ message: "Unexpected server error" });
  }
};
