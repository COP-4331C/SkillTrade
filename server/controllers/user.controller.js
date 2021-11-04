const User = require("../models/user.model");
const UserProfile = require("../models/userProfile.model");

exports.create = async (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      return res.status(200).json({ message: "Successfully created user!" });
    })
    .catch((err) => {
      console.log("An error occured.");
      console.log(err);
      return res.status(400).json({ error: err });
    });
};

exports.editProfile = async (req, res) => {

  var userProfileIdentifier = { email: req.email };
  var newProfileValues = req.body; // instead of passing entire body, only pass in changeable parameters

  var test = await UserProfile.updateOne( userProfileIdentifier, newProfileValues );

  if (test.matchedCount == 0)
    return await res.status(200).json({ message: "User not found!" });
  else if (test.modifiedCount == 0)
    return await res.status(200).json({ message: "Nothing was modified!" });
  else
    return await res.status(200).json({ message: "Successfully edited user!" });

};