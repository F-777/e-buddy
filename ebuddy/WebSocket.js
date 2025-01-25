const http = require("http");
const socketIo = require("socket.io");

// Create HTTP server
const server = http.createServer(app);

// Setup Socket.IO
const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("User connected: " + socket.id);

  // Event: Send message
  socket.on("send_message", (data) => {
    console.log("Message received:", data);
    // Emit message to specific user
    io.to(data.receiverId).emit("receive_message", {
      senderId: data.senderId,
      content: data.content,
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected: " + socket.id);
  });
});

// Start Server
server.listen(3001, () => {
  console.log("Real-time server running on http://localhost:3001");
});
