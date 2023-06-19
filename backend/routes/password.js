const passController = require("../controllers/passwordController");
const router = require("express").Router();

router.post("/check-password", passController.checkPassword);

router.put("/change-password/:userId", passController.ChangePassword);

module.exports = router;
