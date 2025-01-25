const peer = new Peer({
    initiator: true,
    trickle: false,
    config: {
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" }, // STUN Server
        { urls: "turn:your-turn-server.com:3478", username: "user", credential: "password" }, // TURN Server
      ],
    },
    stream,
  });
  