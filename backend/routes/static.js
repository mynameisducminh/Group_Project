const staticController = require("../controllers/statisticController");
const router = require("express").Router();

router.get("/static", staticController.getStatic);

module.exports = router;
