const { Router } = require("express");

const createFeedback = require("../controllers/createFeedback");

const router = Router();

router.post("/", createFeedback);

module.exports = router;
