const Conversation = require("../models/conversation.model");

exports.create = async (req, res) => {
  const conversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  conversation
    .save()
    .then((savedConversation) => {
      return res.status(200).json(savedConversation);
    })
    .catch((err) => {
      console.log("An error occured.");
      console.log(err);
      return res.status(500).json(err);
    });
};

exports.fetchUserConversations = async (req, res) => {
  Conversation.find({ members: { $in: [req.params.userId] } })
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};
