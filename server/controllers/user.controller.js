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

exports.changePassword = async (req, res) =>
{

  
  const {oldPassword, newPassword} = req.body;
  const email = req.email;
  //console.log(email);
  let user = await User.findOne({ email: email });
  if (!user)
    return res.status(400).json({ error: "Invalid email or password." });

  let hash = user.hashPassword(newPassword);

  res.status(200).json({message: `email: ${email} | password hash: ${hash}`});
}