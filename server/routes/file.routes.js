const express = require("express");
const router = express.Router();
const files = require("../controllers/file.controller");
const authenticateToken = require('../middleware/auth');

router.post("/upload", authenticateToken, files.upload);

module.exports = router;