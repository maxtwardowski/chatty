const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

var Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
