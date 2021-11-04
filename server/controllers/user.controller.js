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

  var userProfileIdentifier = { email: req.email };
  var newProfileValues = req.body;

  // Cannot be edited directly through editProfile API
  var protected_fields = ['_id', 'email', 'passwordHash', 'emailVerified', 'role', 'skillCredits'];

  'userProfile' in newProfileValues && delete newProfileValues['userProfile']['_id'];
  
  for (const p of protected_fields)
    delete newProfileValues[p];

  var edit = await User.updateOne( userProfileIdentifier, newProfileValues );

  /* DEBUG
  console.log(userProfileIdentifier);
  console.log(newProfileValues);
  console.log(edit);*/

  // Checks if user was found and at least 1 field modified before returning "Success"
  if (edit.matchedCount == 0)
    return await res.status(400).json({ message: "User not found!" });
  else if (edit.modifiedCount == 0)
    return await res.status(400).json({ message: "Nothing was modified!" });
  else
    return await res.status(200).json({ message: "Successfully edited user!" });

};