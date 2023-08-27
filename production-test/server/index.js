const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

const port = 3001;

const mongourl = "mongodb://localhost:27017/chatapp_db";

mongoose.connect(mongourl).then(() => {
  console.log("MongoDB Connected");
});

app.use("/user", require("./routes/user.router"));
app.use("/conversation", require("./routes/conversation.route"));
app.use("/message", require("./routes/message.route"));

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Socket ID : ", socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    // console.log(data);
    socket.to(data.room).emit("receive_message", data);
  });
});
