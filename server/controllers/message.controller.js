const Message = require("../models/message.model");

exports.create = async (req, res) => {
  const message = new Message(req.body);

  message
    .save()
    .then((savedMessage) => {
      return res.status(200).json(savedMessage);
    })
    .catch((err) => {
      console.log("An error occured.");
      console.log(err);
      return res.status(500).json(err);
    });
};

exports.fetchConversationMessages = async (req, res) => {
  Message.find({ conversationId: req.params.conversationId })
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

exports.deleteMessage = async (req, res) => {
  Message.deleteOne({ messageId: req.params.messageId })
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};
