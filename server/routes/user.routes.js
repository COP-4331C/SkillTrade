const express = require("express");
const router = express.Router();
const users = require("../controllers/user.controller");

// Register
router.post("/register", users.create);

module.exports = router;
