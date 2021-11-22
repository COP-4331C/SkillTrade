const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const uploadFile = require("../middleware/upload");

exports.create = async (req, res) => {
  const { firstName, lastName } = req.body;
  req.body["profile"] = { firstName: firstName, lastName: lastName };

  const user = new User(req.body);
  user.verificationCode = crypto.randomUUID();

  user
    .save()
    .then(() => {
      var transport = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
          user: 'datherp5671@hotmail.com',
          pass: process.env.PASSWORD
        }
      });
    
      var URL = "http://localhost:5000";
      var randomVerificationLink = URL + "/api/user/verify/?userId=" + user._id + "&verificationCode="+ user.verificationCode;
    
      var message = {
        from: "datherp5671@hotmail.com",
        to: user.email,
        subject: "Email Verification - Skill Trade",
        text: "Email Verification - Skill Trade",
        html: "<h>Hello, " + firstName + "!\n\tClick this <a href=\"" + randomVerificationLink + "\">link</a> to verify your e-mail.</h>"
      };
    
      transport.sendMail(message, function(error, info) {
          return res.status(200).json({ message : "Verification email sent!" });
      });
    })
    .catch((err) => {
      if (err.code == 11000)
        return res.status(400).json({ error: "Duplicate email" });

      return res.status(400).json({ error: err });
    });

};

exports.getProfile = async (req, res) => {
  let userId = req.params.userId;

  // Use logged in user id if the userId is not supplied as a request parameter.
  if (!userId) {
    let user = await User.findOne({ email: req.email });
    userId = user._id;
  }

  User.findById(userId)
    .then((data) => {
      res.status(200).json(data.profile);
    })
    .catch((err) => {
      res.status(500).json({ error: "Invalid userId" });
    });
};

exports.editProfile = async (req, res) => {
  let user = await User.findOne({ email: req.email });
  var newValues = req.body;

  var changeable_fields = [
    "firstName",
    "lastName",
    "aboutMe",
    "instagram",
    "twitter",
    "linkedIn",
    "city",
    "state",
    "country",
  ];

  for (const p of changeable_fields) user.profile[p] = newValues[p];

  user
    .save()
    .then(() => {
      return res.status(200).json({ message: "Successfully edited user!" });
    })
    .catch((err) => {
      console.log("An error occured.");
      console.log(err);
      return res.status(400).json({ error: err });
    });
};

exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const space_regex = new RegExp(".* .*");
  const validity_regex = new RegExp(
    "(?=.*[A-Z])(?=.*[.!@#$&*])(?=.*[0-9])(?=.*[a-z])"
  );

  if (
    space_regex.test(newPassword) ||
    newPassword.length < 8 ||
    !validity_regex.test(newPassword)
  ) {
    return res.status(400).json({ error: "Invalid new password" });
  }

  const email = req.email;

  const user = await User.findOne({ email: email });
  if (!user) return res.status(400).json({ error: "Invalid email" });

  let validPassword = user.authenticate(oldPassword);
  if (!validPassword)
    return res.status(400).json({ error: "Incorrect original password." });

  user.password = newPassword;

  user
    .save()
    .then(() => {
      return res
        .status(200)
        .json({ message: "Successfully changed password!" });
    })
    .catch((err) => {
      console.log("An error occured.");
      console.log(err);
      return res.status(400).json({ error: err });
    });
}

exports.verifyEmail = async(req, res) => {
  const {userId, verificationCode} = req.query;

  User
    .findById(userId)
    .then(async (data) => {
      const user = await User.findById(userId);
      if(user.emailVerified || user.verificationCode == "")
      {
        return res.status(405).json({error: "Email is already verified"});
      }
      else if(user.verificationCode != verificationCode)
      {
        console.log("userV:" + user.verificationCode + " - emailV:" + verificationCode);
        return res.status(401).json({error: "Invalid verification code."});
      }
      else
      {
        user.emailVerified = true;
        user.verificationCode = "";
        user
          .save()
          .then(() => {
            res.writeHead(301, { Location: 'https://cop4331c.herokuapp.com/' });
            return res.end();
          })
          .catch((err) => {
            console.log("An error occured.");
            console.log(err);
            return res.status(400).json({ error: err });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({error : "Failed to retrieve user info."});
    }); 
}

exports.uploadProfilePic = async (req, res) => {
  try {
    req.directory = "ProfilePictures";
    await uploadFile(req, res);

    let user = await User.findOne({ email: req.email });
    user.profile.profilePic = req.file.location;

    user.save().then(() => {
      return res.status(200).json({
        message: "Successfully added profile photo!",
        URL: req.file.location,
      });
    });
  } catch (err) {
    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }

    res.status(500).send({
      message: err
    });
  }
};
