const Skill = require("../models/skill.model");
const User = require("../models/user.model");
const uploadFile = require("../middleware/upload");
const Review = require("../models/review.model");

exports.createSkill = async (req, res) => {
  const user = await User.findOne({ email: req.email });
  req.body.userId = user._id;

  const skill = new Skill(req.body);

  skill
    .save()
    .then(() => {
      return res.status(200).json({ message: "Successfully created skill!" });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ error: err });
    });
};

exports.fetchOne = async (req, res) => {
  var skill = await Skill.findById(req.params.skillId)
    .lean()
    .catch((err) => {
      return res.status(403).json({ error: err });
    });

  // Attaches user info to response (fullName, profilePic, rating, etc)
  skill = await addUserInfo(skill);

  return res.status(200).json(skill);
};

exports.fetchByUser = async (req, res) => {
  let userId = req.params.userId;
  let status = req.query.status;

  // Defaults to logged in user if no userId is supplied
  if (!userId) {
    let user = await User.findOne({ email: req.email });
    userId = user._id;
  }

  var searchFor = { userId: userId };

  if (status) searchFor["status"] = status;

  var listOfSkills = await Skill.find(searchFor).sort({ updatedAt: -1 }).lean();

  if (!listOfSkills) return res.status(500).json(err);

  // Attaches user info to each skill for response (fullName, profilePic, rating, etc)
  listOfSkills = await asyncForEach(listOfSkills, addUserInfo);

  return res.status(200).json(listOfSkills);
};

exports.search = async (req, res) => {
  let { search, location, limit, page } = req.query;

  if (!page) page = 0;

  if (!search) search = "";

  if (!limit || limit > 30 || limit < 1) limit = 10;
  // TODO: Implement support for location?
  const searchQuery = { $regex: search, $options: "i" };

  var listOfSkills = await Skill.find({
    $or: [
      { title: searchQuery },
      { summary: searchQuery },
      { description: searchQuery },
    ],
  })
    .skip(limit * (page - 1))
    .limit(limit)
    .sort({ updatedAt: -1 })
    .lean()
    .catch((err) => {
      return res.status(500).json(err);
    });

  // Adds user info to each skill for response (fullName, profilePic, rating, etc)
  listOfSkills = await asyncForEach(listOfSkills, addUserInfo);

  return res.status(200).json(listOfSkills);
};

exports.editSkill = async (req, res) => {
  let skill = await Skill.findOne({ _id: req.params.skillId });
  let loggedInUser = await User.findOne({ email: req.email });

  if (skill.userId != loggedInUser._id)
    return res.status(400).json({
      error: "Invalid Credentials: Cannot edit another user's skill.",
    });

  var newValues = req.body;

  var changeable_fields = [
    "title",
    "summary",
    "description",
    "status",
    "price",
    "country",
    "state",
    "city",
  ];

  for (const p of changeable_fields) skill[p] = newValues[p];

  skill
    .save()
    .then(() => {
      return res.status(200).json({ message: "Successfully edited skill!" });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ error: err });
    });
};

exports.deleteSkill = async (req, res) => {
  const { skillId } = req.params;

  // Grab skill
  const skill = await Skill.findById(skillId);
  if (!skill)
    return res
      .status(400)
      .json({ error: "Invalid skill Id; Skill does not exist." });

  // Grab the currently signed in user's info for their Id
  const loggedInUser = await User.findOne({ email: req.email });

  // Validate that the logged in User is only attempting to delete one of their own skills
  if (skill.userId != loggedInUser._id)
    return res.status(400).json({
      error: "Invalid Credentials: Cannot delete another user's skill.",
    });

  // Once we ensure the user is deleting their own skill, then delete it
  Skill.deleteOne({ _id: skillId })
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

exports.uploadSkillPic = async (req, res) => {
  try {
    req.directory = "SkillPictures";
    const { skillId } = req.params;

    const skill = await Skill.findById(skillId);

    // Grab the currently signed in user's info for their Id
    const loggedInUser = await User.findOne({ email: req.email });

    // Validate that the logged in User is uploading a pic for one of their own skills
    if (skill.userId != loggedInUser._id)
      return res.status(400).json({
        error: "Invalid Credentials: Cannot delete another user's skill.",
      });

    await uploadFile(req, res);
    skill.imageURL = req.file.location; // Puts imageURL in object before saving to database

    skill.save().then(() => {
      return res.status(200).json({
        message: "Successfully added skill photo!",
        URL: req.file.location,
      });
    });
  } catch (err) {
    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }
  }
};

async function addUserInfo(skill) {
  var user = await User.findById(skill.userId);

  if (!user) return;

  skill["userFullName"] = user.profile.firstName + " " + user.profile.lastName;
  skill["userProfilePic"] = user.profile.profilePic;

  var listOfReviews = await Review.find({ subjectId: skill.userId });

  if (!listOfReviews) return;

  var sumRatings = 0;

  for (var review of listOfReviews) sumRatings += review.rating;

  skill["averageRating"] = sumRatings / listOfReviews.length;
  skill["numReviews"] = listOfReviews.length;

  return skill;
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    array[index] = await callback(array[index]);
  }

  return array;
}
