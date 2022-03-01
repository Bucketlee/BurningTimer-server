const { Router } = require("express");

const tasksRouter = require("./tasks");
const usersRouter = require("./users");
const labelsRouter = require("./labels");
const categoriesRouter = require("./categories");
const auth = require("../middlewares/auth");

const router = Router();

router.use("/users", usersRouter);
router.use("/tasks", auth, tasksRouter);
router.use("/labels", auth, labelsRouter);
router.use("/categories", auth, categoriesRouter);

module.exports = router;
