const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

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


// WORK IN PROGRESS! - Rafael
exports.initiateEmailVerification = async(req, res) => {
  const {email} = req.body;

  //let transporter = nodemailer.createTransport(transport[,defaults]);

  // var transport = nodemailer.createTransport({
  //   host: "smtp.mailtrap.io",
  //   port: 2525,
  //   auth: {
  //     user: "b602b7a4557dcc",
  //     pass: "4eb888412f4b4e"
  //   }
  // });

  var transport = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: 'datherp5671@hotmail.com',
      pass: process.env.PASSWORD
    }
  });

  var URL = "http://localhost:5000";
  var randomVerificationLink = URL + "/api/user/verifyEmail/" + crypto.randomUUID();

  var message = {
    from: "datherp5671@hotmail.com",
    to: email,
    subject: "TEST SUBJECT",
    text: "Plaintext version of the message - tester!",
    html: "<h>Click this <a href=\"" + randomVerificationLink + "\">link</a> to verify your e-mail.</h>"
  };

  transport.sendMail(message, function(error, info){
    if (error) {
      return res.status(400).json({ error: "something went wrong" });
    } else {
      return res.status(200).json({ message : "something WORKED!" });
    }
  });

  // const transporter = nodemailer.createTransport({
  //   host: "smtp.example.com",
  //   port: 587,
  //   secure: false, // upgrade later with STARTTLS
  //   auth: {
  //     user: "username",
  //     pass: "password",
  //   },
  // });

}

exports.verifyEmail = async(req, res) => {

}

