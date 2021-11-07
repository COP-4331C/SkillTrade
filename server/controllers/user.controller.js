const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.create = async (req, res) => {

  const { firstName, lastName } = req.body;
  req.body["profile"] = { firstName: firstName, lastName: lastName};

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

exports.changePassword = async (req, res) =>
{
  const {oldPassword, newPassword} = req.body;
  const email = req.email;
  //console.log(email);
  const user = await User.findOne({ email: email });
  if (!user)
    return res.status(400).json({ error: "Invalid email" });

  let validPassword = user.authenticate(oldPassword);
  if (!validPassword)
    return res.status(400).json({ error: "Invalid password." });

  user.password = newPassword;
  
  user
    .save()
    .then(() => {
      return res.status(200).json({message: `TEST: email: ${email} | password hash: ${user.passwordHash}`});
    })
    .catch((err) => {
      console.log("An error occured.");
      console.log(err);
      return res.status(400).json({ error: err });
    });
}

exports.logout = async (req, res) => {
  //insert logout code
}
