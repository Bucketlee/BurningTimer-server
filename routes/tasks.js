const { Router } = require("express");

const { createTask, getTasks, updateTask } = require("../controllers/index");

const router = Router();

router.get("/", getTasks);
router.post("/", createTask);
router.patch("/:taskId", updateTask);

module.exports = router;
