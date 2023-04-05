const customerController = require("../controllers/customerController");

const router = require("express").Router();

router.post("/updateCustomer", customerController.updateCustomer);

router.get("/profile/:id", customerController.profile);

module.exports = router;
 