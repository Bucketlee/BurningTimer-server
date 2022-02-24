const { Router } = require("express");
const tasksRouter = require("./tasks");
const usersRouter = require("./users");
const labelsRouter = require("./labels");

const router = Router();

router.use("/users", usersRouter);
router.use("/tasks", tasksRouter);
router.use("/labels", labelsRouter);

module.exports = router;
