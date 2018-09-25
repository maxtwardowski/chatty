const Conversation = require("../models/coversation");
const Message = require("../models/message");
const User = require("../models/user");
const mongoose = require("mongoose");

exports.sendReply = (req, res, next) => {
  const replyData = {
    conversationID: req.params.convId,
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
  Message
    .find({ conversationID: req.params.convId })
    .populate('author')
    .exec((err, messages) => {
      if (err) return next(err);
      var msgList = [];
      messages.forEach(msg => {
        msgList.push(
          {
            message: msg.body,
            username: msg.author.username,
            createdAt: msg.createdAt
          }
        )
      });
      res.status(200).json({ msgList });
      return next()
    })
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
