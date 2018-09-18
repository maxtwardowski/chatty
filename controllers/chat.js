const Conversation = require("../models/coversation");
const Message = require("../models/message");
const User = require("../models/user");

exports.sendReply = (req, res, next) => {
  const replyData = {
    conversationID: req.params.conversationID,
    body: req.body.messageContent,
    author: req.user._id
  };

  Message.create(replyData, (err, message) => {
    if (err) return next(err);
    res.status(200).json({ message: "Reply has been saved." });
    return next();
  });
};

exports.getAllConversations = (req, res, next) => {
  Conversation.find({ participants: req.user._id }, (err, conversations) => {
    if (err) return next(err);
    res.status(200).json({ conversations });
    return next();
  });
};

exports.getConversation = (req, res, next) => {
  Conversation.findById(req.conversationID, (err, conversation) => {
    if (err) return next(err);
    res.status(200).json({ conversation });
    return next();
  });
};

exports.newConversation = (req, res, next) => {
  const conversationData = req.conversationParticipants;

  Conversation.create(conversationData, (err, conversation) => {
    if (err) return next(err);
    res.status(200).json({ message: "Conversation has been created." });
    return next();
  });
};
