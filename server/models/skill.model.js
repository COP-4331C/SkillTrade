const mongoose = require("mongoose");

const SkillSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    summary: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true
    },
    imageURL: {
      type: String
    },
    status: {
      type: String,
      default: "Teaching",
      // required: true
    },
    price: {
      type: Number,
      required: true
    },
    // If country, state, city are blank: treat as remote
    country: {
      type: String
    },
    state: {
      type: String
    },
    city: {
      type: String
    },
  },
  { timestamps: true }
);

const Skill = mongoose.model("Skill", SkillSchema);

module.exports = Skill;
