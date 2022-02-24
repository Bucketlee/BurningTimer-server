const { Router } = require("express");

const { createLabel, deleteLabel, getLabels, updateLabel } = require("../controllers/index");

const router = Router();

router.post("/", createLabel);
router.delete("/:labelId", deleteLabel);
router.get("/:userId", getLabels);
router.put("/:labelId", updateLabel);

module.exports = router;
