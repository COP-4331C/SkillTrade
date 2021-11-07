const express = require("express");
const router = express.Router();
const messages = require("../controllers/message.controller");

const authenticateToken = require("../middleware/auth.js");

router.post("/", messages.create);

router.get("/:conversationId", messages.fetchConversationMessages);

router.delete("/:conversationId/:messageId", messages.deleteMessage);

module.exports = router;
