const customerController = require("../controllers/customerController");

const router = require("express").Router();

router.post("/createCustomer", customerController.createUser);

module.exports = router;
 