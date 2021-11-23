const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema(
  {
    subjectId: {
      type: String,
      required: true
    },
    authorId: {
      type: String,
      required: true
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