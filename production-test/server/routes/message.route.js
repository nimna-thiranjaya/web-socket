const express = require("express");
const Message = require("../models/message.model");

const MessageRouter = express.Router();

MessageRouter.post("/send", async (req, res) => {
  const message = new Message(req.body);

  const savedMessage = await message.save();

  if (savedMessage) {
    res.send({
      message: "Message Sent Successfully",
      data: savedMessage,
    });
  } else {
    res.status(500).send({
      message: "Message Sending Failed",
      data: savedMessage,
    });
  }
});

//get all messages by conversation id
MessageRouter.get("/:id", async (req, res) => {
  const messages = await Message.find({ conversationId: req.params.id });

  if (messages) {
    res.send({
      message: "Messages Fetched Successfully",
      data: messages,
    });
  } else {
    res.status(500).send({
      message: "Messages Fetching Failed",
      data: messages,
    });
  }
});

module.exports = MessageRouter;
