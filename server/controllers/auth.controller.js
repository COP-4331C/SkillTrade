const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email: email });
  if (!user)
    return res.status(400).json({ error: "Invalid email or password." });

  const validPassword = user.authenticate(password);
  if (!validPassword)
    return res.status(400).json({ error: "Invalid email or password." });

  const accessToken = jwt.sign(email, process.env.AUTH_TOKEN_SECRET);
  return res.status(200).json({ accessToken: accessToken });
};
