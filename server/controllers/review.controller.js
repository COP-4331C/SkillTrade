const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Review = require("../models/review.model");

exports.createReview = async (req, res) => {

    const {rating, subjectId} = req.body;

    // Validate that subjectId is for a real user
    try{
        let subject = await User.findOne({ _id: subjectId });
        if (!subject)
            return res.status(400).json({ error: "not a valid user to review." });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ error: err });
    } 

    // Grab objectId value from author (should be available and valid via authenticationToken)
    try{
        var author = await User.findOne({ email: req.email});
        if(!author)
            return res.status(400).json({ error: "could not obtain userId" });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error: err});
    }

    // Make sure rating is a valid number between 1 and 5
    if(!Number.isInteger(rating) || rating < 1 || rating > 5)
        return res.status(400).json({ error: "invalid rating: must be an INTEGER from 1-5." });

    // Add author ObjectId to request body, then create and add new review to database.
    req.body.authorId = author._id;
    req.body.authorName = author.profile['firstName'];
    const review = new Review(req.body);
    review.save()
        .then(() => {
        return res.status(200).json({ message: "Successfully created review!" });
        })
        .catch((err) => {
        console.log("An error occured.");
        console.log(err);
        return res.status(400).json({ error: err });
        });
}

exports.getReviews = async (req, res) => {
    const {subjectId} = req.body;
    Review.find({subjectId : subjectId})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
}

exports.editReview = async (req, res) => {
    const {reviewId, newRating, newContent} = req.body;
    var review;

    try{
        // Grab review for the author's Id
        review = await Review.findOne({_id : reviewId});
        if(!review)
        {
            return res.status(400).json({ error: "Invalid review Id"});
        }

        // Grab the currently signed in user's info for their Id
        try{
            loggedInUser = await User.findOne({email : req.email});
        }
        catch(err){
            console.log(err);
            return res.status(500).json({ error: err });
        }

        // Validate that the logged in User is only attempting to edit one of their own reviews
        if(review.authorId != loggedInUser._id)
        {
            return res.status(400).json({ error: "Invalid credentials: cannot edit another user's review"});
        }

    }
    catch(err){
        console.log(err);
        return res.status(500).json({ error: err });
    }

    review.rating = newRating;
    review.content = newContent;

    review.save()
        .then(() => {
        return res.status(200).json({ message: "Successfully edited review!" });
        })
        .catch((err) => {
        console.log("An error occured.");
        console.log(err);
        return res.status(400).json({ error: err });
        });

}

exports.deleteReview = async (req, res) => {
    const{reviewId} = req.body;
    var review, loggedInUser;

    try{
        // Grab review for the author's Id
        review = await Review.findOne({_id : reviewId});
        if(!review)
        {
            return res.status(400).json({ error: "Invalid review Id"});
        }

        // Grab the currently signed in user's info for their Id
        try{
            loggedInUser = await User.findOne({email : req.email});
        }
        catch(err){
            console.log(err);
            return res.status(500).json({ error: err });
        }

        // Validate that the logged in User is only attempting to delete one of their own reviews
        if(review.authorId != loggedInUser._id)
        {
            return res.status(400).json({ error: "Invalid credentials: cannot delete another user's review"});
        }

    }
    catch(err){
        console.log(err);
        return res.status(500).json({ error: err });
    }
    
    // Once we ensure the user is deleting their own review, then delete it
    Review.deleteOne({_id : reviewId})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
}