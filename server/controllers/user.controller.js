const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

exports.create = async (req, res) => {

  const { firstName, lastName } = req.body;
  req.body["profile"] = { firstName: firstName, lastName: lastName};

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
      var randomVerificationLink = URL + "/api/user/?userId=" + user._id + "&verificationCode="+ user.verificationCode;
    
      var message = {
        from: "datherp5671@hotmail.com",
        to: user.email,
        subject: "Email Verification - Skill Trade",
        text: "Email Verification - Skill Trade",
        html: "<h>Click this <a href=\"" + randomVerificationLink + "\">link</a> to verify your e-mail.</h>"
      };
    
      transport.sendMail(message, function(error, info){
        if (error) {
          return res.status(400).json({ error: "something went wrong" });
        } else {
          return res.status(200).json({ message : "something WORKED!" });
        }
      });
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
            return res.status(200).json({ message: "Successfully verified email!" });
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