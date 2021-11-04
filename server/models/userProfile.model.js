const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserProfileSchema = mongoose.Schema({
  aboutMe: {
    type: String,
    unique: false,
    default: "I'm ready to teach and learn!",
    maxLength: [500, "About Me must be less than 500 characters."]
  },
  profilePic: { // Contains URL to the hosted image
    type: String,
    unique: false,
    default: "https://picsum.photos/200/200"
  }/*,
  servicesOffering: {
    type: Service
  }*/

});

const UserProfile = mongoose.model("UserProfile", UserProfileSchema);

module.exports = UserProfile;
