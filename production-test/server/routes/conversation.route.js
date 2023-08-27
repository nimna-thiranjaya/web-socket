const express = require("express");
const Conversation = require("../models/conversation.model");

const ConversationRouter = express.Router();

ConversationRouter.post("/create", async (req, res) => {
  const conversation = new Conversation(req.body);

  const savedConversation = await conversation.save();

  if (savedConversation) {
    res.send({
      message: "Conversation Created Successfully",
      data: savedConversation,
    });
  } else {
    res.status(500).send({
      message: "Conversation Creation Failed",
      data: savedConversation,
    });
  }
});

//get all conversations
ConversationRouter.get("/", async (req, res) => {
  const conversations = await Conversation.find({});

  if (conversations) {
    res.send({
      message: "Conversations Fetched Successfully",
      data: conversations,
    });
  } else {
    res.status(500).send({
      message: "Conversations Fetching Failed",
      data: conversations,
    });
  }
});

//get conversation by id
ConversationRouter.get("/:id", async (req, res) => {
  const conversation = await Conversation.findById(req.params.id);

  if (conversation) {
    res.send({
      message: "Conversation Fetched Successfully",
      data: conversation,
    });
  } else {
    res.status(500).send({
      message: "Conversation Fetching Failed",
      data: conversation,
    });
  }
});

module.exports = ConversationRouter;
