const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  member01: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  member02: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Conversation = mongoose.model("Conversation", conversationSchema);
module.exports = Conversation;
