const mailersController = require("../controllers/mailerControllers");
const router = require("express").Router();

router.post("/send-email", mailersController.sendEmail);

router.post("/check-code", mailersController.checkCode);

router.post("/forgot-password", mailersController.forgotPassword);

module.exports = router;
