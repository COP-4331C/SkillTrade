const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Review = require("../models/review.model");

exports.createReview = async (req, res) => {

    const {rating, subjectId} = req.body;

    // Validate that userId is for a real user
    const user = await User.findById(subjectId);
    if (!user)
        return res.status(400).json({ error: "Not a valid user to review." });

    // Grab objectId value from reviewer (should be available and valid via authenticationToken)
    const author = await User.findOne({ email: req.email });
    if (!author)
        return res.status(400).json({ error: "Could not obtain reviewer's information." });

    // Make sure rating is a valid number between 1 and 5
    if (!Number.isInteger(rating) || rating < 1 || rating > 5)
        return res.status(400).json({ error: "Invalid Rating; Must be an Integer from 1-5." });

    // Add reviewer ObjectId to request body, then create and add new review to database.
    req.body.authorId = author._id;

    const review = new Review(req.body);

    review.save()
        .then(() => {
        return res.status(200).json({ message: "Successfully created review!" });
        })
        .catch((err) => {
        console.log("An error occurred; could not create review.");
        console.log(err);
        return res.status(400).json({ error: err });
        });
}

exports.getReviews = async (req, res) => {
    var listOfReviews = await Review.find({subjectId : req.params.userId})
    .lean()
    .catch((err) => {
      res.status(500).json(err);
    });

    for (var review of listOfReviews) {
        var author = await User.findById(review.authorId);

        if (!author)
            continue;

        review["authorFullName"] = author.profile.firstName + " " + author.profile.lastName;
        review["authorProfilePic"] = author.profile.profilePic;
    }

    res.status(200).json(listOfReviews);
}

exports.editReview = async (req, res) => {

    const {reviewId, newRating, newContent} = req.body;

    // Grab review for the reviewer's Id
    const review = await Review.findById(reviewId);
    if(!review)
        return res.status(400).json({ error: "Invalid review Id; Review does not exist."});

    // Grab the currently signed in user's info for their Id
    const loggedInUser = await User.findOne({email : req.email});

    // Validate that the logged in User is only attempting to edit one of their own reviews
    if(review.authorId != loggedInUser._id)
        return res.status(400).json({ error: "Invalid Credentials; Cannot edit another user's review."});

    review.rating = newRating;
    review.content = newContent;

    review.save()
        .then(() => {
        return res.status(200).json({ message: "Successfully edited review!" });
        })
        .catch((err) => {
        console.log("An error occured; Could not edit review.");
        console.log(err);
        return res.status(400).json({ error: err });
        });

}

exports.deleteReview = async (req, res) => {

    //const{reviewId} = req.body;
    const reviewId = req.params.reviewId;

    // Grab review for the reviewer's Id
    const review = await Review.findById(reviewId);
    if(!review)
        return res.status(400).json({ error: "Invalid review Id; Review does not exist."});

    // Grab the currently signed in user's info for their Id
    const loggedInUser = await User.findOne({email : req.email});

    // Validate that the logged in User is only attempting to delete one of their own reviews
    if(review.authorId != loggedInUser._id)
        return res.status(400).json({ error: "Invalid Credentials; Cannot delete another user's review."});
    
    // Once we ensure the user is deleting their own review, then delete it
    Review.deleteOne({_id : reviewId})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
}