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