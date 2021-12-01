const express = require("express");
const router = express.Router();
const conversations = require("../controllers/conversation.controller");

const authenticateToken = require("../middleware/auth.js");

// router.post("/", conversations.create);

router.get("/:userId", conversations.fetchUserConversations);

module.exports = router;
