const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const nodemailer = require("nodemailer");

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
      return res.status(200).json({message: `TEST: email: ${email} | password hash: ${user.passwordHash}`});
    })
    .catch((err) => {
      console.log("An error occured.");
      console.log(err);
      return res.status(400).json({ error: err });
    });
}

exports.uploadPicture = async(req, res) => {

  const {picture_content} = req.body;

  picture_content = Buffer.from(picture_content, 'base64').toString('binary');

  // Picture should be less than 1mb, aka 1,000,000 bits
  if(picture_content.length > 1000000)
  {
    return res.status(400).json({ error: "File size is too large." });
  }

  picture_content = Buffer.from(picture_content).toString('base64');

  const email = req.email;
  const user = await User.findOne({ email: email });
  if (!user)
    return res.status(400).json({ error: "Invalid email" });

  // how to put image as profile pic?
  // store it in sepearte data folder, and have it be a path to the image?
  // if so, how to do that?


}

exports.verifyEmail = async(req, res) => {

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
    service: 'gmail',
    auth: {
      user: 'rafael.a0vg@gmail.com',
      pass: 'yourpassword'
    }
  });

  var message = {
    from: "sender@server.com",
    to: email,
    subject: "Message title",
    text: "Plaintext version of the message - tester!",
    html: "<p>HTML version of the message</p>"
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

exports.logout = async (req, res) => {
  //insert logout code
}