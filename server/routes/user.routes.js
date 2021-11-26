const express = require("express");
const router = express.Router();
const users = require("../controllers/user.controller");
const authenticateToken = require("../middleware/auth");

// Register
router.post("/register", users.create);

router.get("/id", authenticateToken, users.getId);

// Get Profile
router.get("/profile/:userId?", authenticateToken, users.getProfile);

// Edit Profile
router.put("/edit-profile", authenticateToken, users.editProfile);

// Change Password
router.patch("/change-password", authenticateToken, users.changePassword);

// Forgot Password (Initial Email)
router.post("/forgot-password", users.forgotPassword);

// Reset Password (Final Step)
router.patch("/reset-password", users.resetPassword);

// Verify Email
router.route("/verify/").get(users.verifyEmail);

// Upload Profile Picture
router.post("/upload-profile-pic", authenticateToken, users.uploadProfilePic);

// Search for users
router.get("/search", users.search);

module.exports = router;
