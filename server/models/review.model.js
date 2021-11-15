const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema(
  {
    userId: {
      type: String,
    },
    reviewerId: {
      type: String,
      //required: true,
    },
    reviewerName: {
      type: String,
    },
    rating: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  }
);

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;