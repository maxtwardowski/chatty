const Conversation = require("../models/coversation");
const Message = require("../models/message");
const User = require("../models/user");
const mongoose = require("mongoose");

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
  Conversation
    .find({ participants: req.user._id })
    .populate('participants')
    .exec((err, conversations) => {
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
  var convIDs = req.body.convParticipants;
  convIDs.forEach(element => {
    element = mongoose.Types.ObjectId(element);
  });

  const convData = { participants: convIDs };

  Conversation.create(convData, (err, conversation) => {
    if (err) return next(err);
    res.status(200).json({ message: "Conversation has been created." });
    return next();
  });
};
