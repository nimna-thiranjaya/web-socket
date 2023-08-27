const express = require("express");
const User = require("../models/user.model");

const UserRouter = express.Router();

UserRouter.post("/register", async (req, res) => {
  const user = new User(req.body);

  const savedUser = await user.save();

  if (savedUser) {
    res.send({
      message: "User Registered Successfully",
      data: savedUser,
    });
  } else {
    res.status(500).send({
      message: "User Registration Failed",
      data: savedUser,
    });
  }
});

UserRouter.post("/login", async (req, res) => {
  const body = req.body;

  const user = await User.findOne({ username: body.username });

  if (user) {
    if (user.password === body.password) {
      res.send({
        message: "Login Success",
        data: user,
      });
    } else {
      res.status(401).send({
        message: "Invalid Password",
      });
    }
  } else {
    res.status(401).send({
      message: "Invalid Username",
    });
  }
});

module.exports = UserRouter;
