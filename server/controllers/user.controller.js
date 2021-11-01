const jwt = require("jsonwebtoken");
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

// when testing with insomnia, i manually enter the access token. does this
// code have the access token already from the routes page?
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

  // wouldn't i have to just set the authentication token to null?
}