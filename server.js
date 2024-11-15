const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

// Serve a simple message on the root route
app.get("/", (req, res) => {
  res.send("Chat Server is running!");
});

// Handle WebSocket connections
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("chatMessage", (msg) => {
    io.emit("message", msg); // Broadcast the message to all connected clients
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
