io.on("connection", (socket) => {
    console.log("User connected for WebRTC: " + socket.id);
  
    // Meneruskan pesan signaling
    socket.on("signal", (data) => {
      const { to, from, signal } = data;
      io.to(to).emit("signal", { from, signal });
    });
  
    socket.on("join_call", (room) => {
      socket.join(room);
      socket.broadcast.to(room).emit("user-joined", socket.id);
    });
  });
  