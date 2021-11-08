const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema(
  {
    authorId: {
      type: String,
    },
    subjectId: {
      type: String,
      //required: true,
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