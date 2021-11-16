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

// Verify Email*
//router.post("/verifyEmail", users.verifyEmail);

// Upload Profile Picture
router.post("/upload-profile-pic", authenticateToken, users.uploadProfilePic);

module.exports = router;
