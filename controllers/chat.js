const Conversation = require("../models/coversation");
const Message = require("../models/message");
const User = require("../models/user");

exports.getConversations = (req, res, next) => {
  Conversation.find({ participants: req.user._id })
    .select();
};
