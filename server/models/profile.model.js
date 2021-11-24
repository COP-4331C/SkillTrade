const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const ProfileSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [1, "First name must be between 1 and 50 characters."],
    maxLength: [50, "First name must be between 1 and 50 characters."],
  },
  lastName: {
    type: String,
    default: "",
    maxLength: [50, "Last name must be less than 50 characters."],
  },
  aboutMe: {
    type: String,
    default: "I'm ready to teach and learn!",
    maxLength: [500, "About Me must be less than 500 characters."]
  },
  profilePic: { // Contains URL to the hosted image
    type: String,
    default: "https://picsum.photos/300/450"
  },
  instagram: {
    type: String,
    default: "Instagram"
  },
  twitter: {
    type: String,
    default: "Twitter"
  },
  linkedIn: {
    type: String,
    default: "LinkedIn"
  },
  city: {
    type: String,
    default: ""
  },
  state: {
    type: String,
    default: ""
  },
  country: {
    type: String,
    default: ""
  }
});

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;
