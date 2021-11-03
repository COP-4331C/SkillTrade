const express = require("express");
const router = express.Router();
const users = require("../controllers/user.controller");
const authenticateToken = require('../middleware/auth');

// Register
router.post("/register", users.create);

// Edit Profile
router.put("/edit-profile", authenticateToken, users.editProfile);

module.exports = router;