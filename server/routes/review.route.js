const express = require("express");
const router = express.Router();
const reviews = require("../controllers/review.controller");
const authenticateToken = require('../middleware/auth');

// Create new review
router.post("/createReview", authenticateToken, reviews.createReview);

// Get Review(s)
// router.get("/get-reviews", reviews.getReviews);

// // Edit Review
// router.put("/edit-review", authenticateToken, reviews.editReview);

// Delete Review


modules.exports = router;