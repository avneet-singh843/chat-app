require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT;
const messageHistory = [];

io.on("connection", (socket) => {
  console.log(`A user connected: ${socket.id}`);
  socket.emit("message_history", messageHistory);
  socket.on("send_message", (data) => {
    const message = {
      ...data, // {username, text}
      timestamp: new Date(),
      id: `${socket.id}-${new Date().getTime()}`,
    };
    messageHistory.push(message);

    if (messageHistory.length > 20) {
      messageHistory.shift();
    }
    io.emit("receive_message", message);
    console.log(`Message from ${data.username}: ${data.text}`);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`✅ Server is running and listening on port ${PORT}`);
});
