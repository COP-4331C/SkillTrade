const Skill = require("../models/skill.model");

exports.createSkill = async (req, res) => {
  const skill = new Skill(req.body);

  skill
    .save()
    .then(() => {
      return res.status(200).json({ message: "Successfully created skill!" });
    })
    .catch((err) => {
      console.log("An error occured.");
      console.log(err);
      return res.status(400).json({ error: err });
    });
};

exports.fetchOne = async (req, res) => {
  Skill.findById(req.params.skillId)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.search = async (req, res) => {
  const { search, location, page } = req.query;
  const limit = 15;
  // TODO: Implement support for location?

  Skill.find({ title: { $regex: search } })
    .skip(limit * page)
    .limit(limit)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.editSkill = async (req, res) => {
  let skill = await Skill.findOne({ _id: req.params.skillId });
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
      console.log("An error occured.");
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

  // // Validate that the logged in User is only attempting to delete one of their own reviews
  if (skill.userId != loggedInUser._id)
    return res.status(400).json({
      error: "Invalid Credentials: Cannot delete another user's skill.",
    });

  // Once we ensure the user is deleting their own skill, then delete it
  Skill.deleteOne({ _id: skillId })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
