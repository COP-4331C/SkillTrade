const User = require("../models/user.model");

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

  let user = await User.findOne({ email: req.email });
  var newValues = req.body;

  var changeable_fields = ['firstName', 'lastName', 'aboutMe', 'profilePic'];

  for (const p of changeable_fields)
    user.profile[p] = newValues[p];

  user.save()
      .then(() => {
        return res.status(200).json({ message: "Successfully edited user!" });
      })
      .catch((err) => {
        console.log("An error occured.");
        console.log(err);
        return res.status(400).json({ error: err });
      });
};