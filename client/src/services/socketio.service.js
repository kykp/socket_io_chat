import { io } from "socket.io-client";
import { SOCKET_URL } from "../config.js";
let socket;

export const initiateSocketConnection = (name, room) => {
  socket = io();
  // console.log(`Connecting socket...`);
  socket.emit("user join", { name, room });
};

export const disconnectSocket = () => {
  // console.log("Disconnecting socket...");
  if (socket) socket.disconnect();
};

export const sendMessageToChat = (message) => {
  socket.emit("chatMessage", message);
};

export const listenToMessage = (cb) => {
  socket.on("message", (data) => {
    return cb(data);
  });
};

export const listenToRoomUsers = (cb) => {
  socket.on("roomUsers", ({ room, users }) => {
    return cb({ room, users });
  });
};
