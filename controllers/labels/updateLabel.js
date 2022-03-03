const Label = require("../../models/label");
const User = require("../../models/user");
const Task = require("../../models/task");

module.exports = async function updateLabel(req, res) {
  const username = req.token;
  const { labelId } = req.params;
  const { name, priority } = req.body;

  if (!labelId) {
    return res.status(400).send({ message: "Not found label ID" });
  }

  try {
    const user = await User.findOne({ username });

    // 이미 name으로 된 라벨이 존재하는지 확인
    const isLabelExists = await Label.findOne({ $and: [{ userId: user._id }, { name }, { _id: { $ne: labelId } }] })

    if (isLabelExists && isLabelExists.priority !== 0) {
      // 활성화 된 라벨 중 중복된 이름이 있을 경우 에러 반환
      return res.status(400).send({ message: "This label is already exists" });
    } else if (isLabelExists && isLabelExists.priority === 0) {
      // 활성화 된 라벨에는 없지만 비활성화 된 라벨 중 중복된 이름이 있을 경우 라벨 통합 작업 (비활성화 된 라벨를 활성화 된 라벨로 통합)
      const id = isLabelExists._id;

      // 테스크 labelId 변경 작업
      await Task.updateMany({ labelId: id }, { labelId });

      // 통합작업 완료되었으므로 비활성화 된 라벨 삭제
      await Label.deleteOne({ _id: id });
    }

    // 변경 전 라벨 data로 변수화
    const data = await Label.findOne({ _id: labelId });

    // 라벨 이름 및 우선순위 업데이트
    if (data.priority === priority) {
      // 우선순위 변동 없이 이름만 변경하는 경우
      await Label.updateOne({ _id: labelId }, { name });
    } else if (data.priority > priority) {
      // 우선순위를 앞으로 당기는 경우
      await Label.updateMany({ $and: [{ userId: user._id }, { priority: { $gte: priority } }, { priority: { $lt: data.priority } }] }, { $inc: { priority: 1 } });
      await Label.updateOne({ _id: labelId }, { name, priority });
    } else {
      // 우선순위를 뒤로 미루는 경우
      await Label.updateMany({ $and: [{ userId: user._id }, { priority: { $gt: data.priority } }, { priority: { $lte: priority } }] }, { $inc: { priority: -1 } });
      await Label.updateOne({ _id: labelId }, { name, priority });
    }
    return res.status(200).send({ message: "Ok" });
  } catch (err) {
    return res.status(500).send({ message: "Unexpected server error" });
  }
};
