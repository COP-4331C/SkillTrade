const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Review = require("../models/review.model");

exports.createReview = async (req, res) => {

    const {rating, subjectId} = req.body;

    // const user = await User.findOne({ _id: subjectId });
    // if (!user)
    //     return res.status(400).json({ error: "not a valid user to review." });

    if(!Number.isInteger(rating) || rating < 1 || rating > 5)
    {
        return res.status(400).json({ error: "invalid rating: must be an INTEGER from 1-5." });
    }

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