const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    maxLength: [320, "Email must be less than 320 characters."],
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
  },
  passwordHash: {
    type: String,
    required: true,
    default: "",
  },
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
  emailVerified: {
    type: Boolean,
    default: false,
    required: true,
  },
  role: {
    type: Number,
    default: 0,
    required: true,
  },
  skillCredits: {
    type: Number,
    default: 0,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

UserSchema.virtual("password")
  .set(function (password) {
    this._password = password;
    this.passwordHash = this.hashPassword(password);
  })
  .get(function () {
    return this._password;
  });

UserSchema.pre("save", function (next) {
  if (!this.isNew) return next();

  if (!this.password || !this.password.length) {
    next(new Error("Invalid password"));
  } else {
    next();
  }
});

UserSchema.methods = {
  authenticate: function (plainText) {
    return bcrypt.compareSync(plainText, this.passwordHash);
  },
  hashPassword: function (plainText) {
    return bcrypt.hashSync(plainText, 10);
  },
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
