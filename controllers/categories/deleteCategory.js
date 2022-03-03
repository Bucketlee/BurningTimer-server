const Category = require("../../models/category");
const User = require("../../models/user");
const Label = require("../../models/label");

module.exports = async function deleteCategory(req, res) {
  const username = req.token;
  const { categoryId } = req.params;

  if (!categoryId) {
    return res.status(400).send({ message: "Not found category ID" });
  }

  try {
    // 삭제 권한이 있는지 확인
    const user = await User.findOne({ username });
    const { name, priority } = await Category.findOne({ $and: [{ userId: user._id }, { _id: categoryId }] });

    if (!name) {
      return res.status(400).send({ message: "Not found category with that ID" });
    }

    // 우선순위 업데이트
    await Category.updateMany({ $and: [{ userId: user._id }, { priority: { $gt: priority } }] }, { $inc: { priority: -1 } })

    // 카테고리 비활성화 및 카테고리에 해당하는 라벨 전체 비활성화
    await Label.updateMany({ categoryId: categoryId }, { priority: 0 });
    await Category.updateOne({ _id: categoryId }, { priority: 0 });
    return res.status(200).send({ message: "Ok" });
  } catch (err) {
    return res.status(500).send({ message: "Unexpected server error" });
  }
};
