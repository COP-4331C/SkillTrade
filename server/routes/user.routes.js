const express = require("express");
const router = express.Router();
const users = require("../controllers/user.controller");
const authenticateToken = require('../middleware/auth');

const authenticateToken = require("../middleware/auth.js");

// Register
router.post("/register", users.create);

// Edit Profile
router.put("/edit-profile", authenticateToken, users.editProfile);

// Logout*
router.post("/logout", users.logout);

// Change Password
router.post("/changePassword", authenticateToken, users.changePassword);

module.exports = router;
