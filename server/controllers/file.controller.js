const uploadFile = require("../middleware/upload");
const User = require("../models/user.model");

exports.upload = async (req, res) => {
  try {
    await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    let user = await User.findOne({ email: req.email });
    user.profile.profilePic = req.file.location;
  
    user.save().then(() => { return res.status(200).json({ message: "Successfully added profile photo!" });});

  } catch (err) {
    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }

    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};