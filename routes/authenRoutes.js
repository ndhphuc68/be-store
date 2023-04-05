const authenController = require("../controllers/authenController");

const router = require("express").Router();

router.post("/register", authenController.register);

router.post("/login", authenController.login);

module.exports = router;
