const express = require("express");
const router = express.Router();
const users = require("../controllers/user.controller");
const authenticateToken = require('../middleware/auth');

// Register
router.post("/register", users.create);

// Edit Profile
router.patch("/edit-profile", authenticateToken, users.editProfile);

// Change Password
router.patch("/change-password", authenticateToken, users.changePassword);

// Verify Email (2 part: initiation and acutal verification)
router.post("/verifyEmail", users.initiateEmailVerification);
router.patch("/verifyEmail/:verificationCode", users.verifyEmail);

module.exports = router;
