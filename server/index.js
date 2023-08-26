const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const port = 3001;

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  // console.log("Socket ID : ", socket.id);

  socket.on("join_room", (data) => {
    console.log("Room ID : ", data);
    socket.join(data);
    console.log("User Joined Room : ", data);
  });

  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.roomID).emit("receive_message", data.content);
  });
});
