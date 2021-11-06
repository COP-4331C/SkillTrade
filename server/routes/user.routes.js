const express = require("express");
const router = express.Router();
const users = require("../controllers/user.controller");

const authenticateToken = require("../middleware/auth.js");

// Register
router.post("/register", users.create);

// Logout*
router.post("/logout", users.logout);

// Change Password
router.post("/changePassword", authenticateToken, users.changePassword);

// Verify Email*
router.post("/verifyEmail", users.verifyEmail);

module.exports = router;
