const express = require("express");
const router = express.Router();
const reviews = require("../controllers/review.controller");
const authenticateToken = require('../middleware/auth');

// Create new review
router.post("/create-review", authenticateToken, reviews.createReview);

// Get Review(s)
router.get("/get-reviews/:userId", reviews.getReviews);

// Edit Review 
router.patch("/edit-review", authenticateToken, reviews.editReview);

// Delete Review
router.delete("/delete-review/:reviewId", authenticateToken, reviews.deleteReview);


module.exports = router; 