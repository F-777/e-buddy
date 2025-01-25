import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

function Chat() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    // Listen for incoming messages
    socket.on("receive_message", (data) => {
      setChatHistory((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const sendMessage = () => {
    socket.emit("send_message", {
      senderId: "123", // Replace with dynamic user ID
      receiverId: "456", // Replace with dynamic receiver ID
      content: message,
    });
    setChatHistory((prev) => [...prev, { senderId: "123", content: message }]);
    setMessage("");
  };

  return (
    <div>
      <h2>Chat</h2>
      <div>
        {chatHistory.map((msg, index) => (
          <div key={index}>
            <strong>{msg.senderId}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;
