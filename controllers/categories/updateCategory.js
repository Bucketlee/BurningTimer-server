const Category = require("../../models/category");
const User = require("../../models/user");
const Label = require("../../models/label");
const Task = require("../../models/task");

module.exports = async function updateCategory(req, res) {
  const username = req.token;
  const { categoryId } = req.params;
  const { name, priority } = req.body;

  if (!categoryId) {
    return res.status(400).send({ message: "Not found category ID" });
  }

  try {
    const user = await User.findOne({ username });

    // 이미 name으로 된 카테고리가 존재하는지 확인
    const isCategoryExist = await Category.findOne({ $and: [{ userId: user._id }, { name }, { _id: { $ne: categoryId } }] })

    if (isCategoryExist && isCategoryExist.priority !== 0) {
      // 활성화 된 카테고리 중 중복된 이름이 있을 경우 에러 반환
      return res.status(400).send({ message: "This category is already exists" });
    } else if (isCategoryExist && isCategoryExist.priority === 0) {
      // 활성화 된 카테고리중에는 없지만 비활성화 된 카테고리 중 중복된 이름이 있을 경우 카테고리 통합 작업 (비활성화 된 카테고리를 활성화 된 카테고리로 통합)
      const id = isCategoryExist._id;

      // 라벨과 테스크 categoryId 변경 작업
      await Label.updateMany({ categoryId: id }, { categoryId });
      await Task.updateMany({ categoryId: id }, { categoryId });

      // 통합작업 완료되었으므로 비활성화 된 카테고리 삭제
      await Category.deleteOne({ _id: id });
    }

    // 변경 전 카테고리 data로 변수화
    const data = await Category.findOne({ _id: categoryId });

    // 카테고리 이름 및 우선순위 업데이트
    if (data.priority === priority) {
      // 우선순위 변동 없이 이름만 변경하는 경우
      await Category.updateOne({ _id: categoryId }, { name });
    } else if (data.priority > priority) {
      // 우선순위를 앞으로 당기는 경우
      await Category.updateMany({ $and: [{ userId: user._id }, { priority: { $gte: priority } }, { priority: { $lt: data.priority } }] }, { $inc: { priority: 1 } });
      await Category.updateOne({ _id: categoryId }, { name, priority });
    } else {
      // 우선순위를 뒤로 미루는 경우
      await Category.updateMany({ $and: [{ userId: user._id }, { priority: { $gt: data.priority } }, { priority: { $lte: priority } }] }, { $inc: { priority: -1 } });
      await Category.updateOne({ _id: categoryId }, { name, priority });
    }
    return res.status(200).send({ message: "Ok" });
  } catch (err) {
    return res.status(500).send({ message: "Unexpected server error" });
  }
};
