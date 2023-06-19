const PayControllers = require("../controllers/paymentControllers");
const router = require("express").Router();

router.post("/create_url", PayControllers.PaymentOrder);

module.exports = router;
