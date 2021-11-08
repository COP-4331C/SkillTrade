const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Review = require("../models/review.model");

exports.createReview = async (req, res) => {

    const {rating, subjectId} = req.body;
    

    try{
        var subject = await User.findOne({ _id: subjectId });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ error: err });
    }
    
    if (!subject)
    {
        return res.status(400).json({ error: "not a valid user to review." });
    }
    else
        console.log("found subject: %s", subject.email);

    try{
        var author = await User.findOne({ email: req.email});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error: err});
    }

    if(!author)
    {
        return res.status(400).json({ error: "this should be a valid user!!!" });
    }
    else
    {
        console.log("found author: %s", author.email);

    }



    if(!Number.isInteger(rating) || rating < 1 || rating > 5)
    {
        return res.status(400).json({ error: "invalid rating: must be an INTEGER from 1-5." });
    }

    const review = new Review(req.body);
    review.authorId = author._id;
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