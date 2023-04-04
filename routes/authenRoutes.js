const authenController = require("../controllers/authenController");

const router = require("express").Router();

router.post("/register", authenController.register);

module.exports = router;