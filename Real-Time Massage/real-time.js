const io = require("socket.io")(server);

io.on("connection", (socket) => {
    console.log("User connected: " + socket.id);
    
    socket.on("send_message", (data) => {
        io.to(data.receiverId).emit("receive_message", data);
    });
});
