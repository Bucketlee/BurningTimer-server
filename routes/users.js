const { Router } = require("express");

const { login, signup, findId, findPassword } = require("../controllers/index");

const router = Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/help/id", findId);
router.post("/help/pw", findPassword);

module.exports = router;
