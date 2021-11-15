const express = require("express");
const router = express.Router();
const users = require("../controllers/user.controller");
const authenticateToken = require('../middleware/auth');

// Register
router.post("/register", users.create);

// Edit Profile
router.patch("/edit-profile", authenticateToken, users.editProfile);

// Logout*
router.post("/logout", users.logout);

// Change Password
router.patch("/change-password", authenticateToken, users.changePassword);

// Verify Email*
router.post("/verifyEmail", users.verifyEmail);

module.exports = router;
