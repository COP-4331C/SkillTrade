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

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;
