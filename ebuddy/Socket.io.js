io.on("connection", (socket) => {
    console.log("User connected: " + socket.id);
  
    // Bergabung ke grup
    socket.on("join_group", (groupId) => {
      socket.join(groupId);
      console.log(`User ${socket.id} joined group: ${groupId}`);
    });
  
    // Kirim pesan ke grup
    socket.on("send_group_message", (data) => {
      const { groupId, senderId, content } = data;
      io.to(groupId).emit("receive_group_message", { senderId, content });
    });
  });
  