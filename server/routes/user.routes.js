const express = require("express");
const router = express.Router();
const users = require("../controllers/user.controller");
const authenticateToken = require('../middleware/auth');

// Register
router.post("/register", users.create);

// Edit Profile
router.put("/edit-profile", authenticateToken, users.editProfile);

// Get Profile
router.get("/profile/:userId", users.getProfile);

// Change Password
router.put("/change-password", authenticateToken, users.changePassword);

module.exports = router;