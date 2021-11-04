const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserProfileSchema = mongoose.Schema({
  aboutMe: {
    type: String,
    unique: false,
    default: "I'm ready to teach and learn!",
    maxLength: [500, "About Me must be less than 500 characters."]
  },
  profilePic: { // Will contain a URL to the hosted image
    type: String,
    unique: false,
    default: "https://preview.redd.it/w3kr4m2fi3111.png?auto=webp&s=b4fb4bdfd262de01e49b9f7463d784c6d9013a1b"
  }/*,
  servicesOffering: {
    type: Service
  }*/

});

const UserProfile = mongoose.model("UserProfile", UserProfileSchema);

module.exports = UserProfile;
