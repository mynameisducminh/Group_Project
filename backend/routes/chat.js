const ChatBoxController = require("../controllers/chatboxController");
const router = require("express").Router();

router.post("/chat-box", ChatBoxController.BotChat);
router.post("/chat-check-size", ChatBoxController.CheckSize);

module.exports = router;
