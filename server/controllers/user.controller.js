const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

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

  var changeable_fields = ['firstName', 'lastName', 'aboutMe', 'instagram', 'twitter', 'linkedIn', 'city', 'state', 'country'];

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

exports.getProfile = async (req, res) => {
  User.findOne({ _id: req.params.userId })
    .then((data) => {
      res.status(200).json(data.profile);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.changePassword = async (req, res) =>
{
  const {oldPassword, newPassword} = req.body;

  const space_regex = new RegExp('.* .*');
  const validity_regex = new RegExp('(?=.*[A-Z])(?=.*[.!@#$&*])(?=.*[0-9])(?=.*[a-z])');

  if(space_regex.test(newPassword) ||  newPassword.length < 8 || !validity_regex.test(newPassword))
  {
    return res.status(400).json({ error: "Invalid new password" });
  }

  const email = req.email;


  const user = await User.findOne({ email: email });

  if (!user)
    return res.status(400).json({ error: "Invalid email" });

  let validPassword = user.authenticate(oldPassword);

  if (!validPassword)
    return res.status(400).json({ error: "Incorrect original password." });

  user.password = newPassword;
  
  user
    .save()
    .then(() => {

      return res.status(200).json({message: "Successfully changed password!"});

    })
    .catch((err) => {
      console.log("An error occured.");
      console.log(err);
      return res.status(400).json({ error: err });
    });

}
