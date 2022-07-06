import express from "express";
import { fileURLToPath } from "url";
import http from "http";
import cors from "cors";
import path from "path";

import { Server } from "socket.io";
import {
  userJoin,
  getCurrentUser,
  getRoomUsers,
  userLeave,
} from "./utils/users.js";

import { formatMessage } from "./utils/message.js";
const app = express();
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("This is from express.js");
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://kykp-chat-websocket.herokuapp.com/",
    methods: ["GET", "POST"],
  },
});
const botName = "Chat Bot";

io.on("connection", (socket) => {
  socket.on("user join", ({ name, room }) => {
    const user = userJoin(socket.id, name, room);

    socket.join(user.room);

    //welcome current user
    socket.emit("message", formatMessage(botName, "Welcome to Chat!"));

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    // Send users and room info
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  // Listen for chatMessage
  socket.on("chatMessage", (message) => {
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit("message", formatMessage(user.username, message));
  });

  // Runs when client disconnects
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);
    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(botName, `${user.username} has left the chat`)
      );
    }

    //send users and room info
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });
});

server.listen(PORT, () => {
  console.log(`server was running on port ${PORT}`);
});
