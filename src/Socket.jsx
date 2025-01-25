import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:3001");

function GroupChat({ groupId }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Bergabung ke grup
    socket.emit("join_group", groupId);

    // Ambil pesan grup dari server
    const fetchMessages = async () => {
      const response = await axios.get(`/api/groups/${groupId}/messages`);
      setMessages(response.data.messages);
    };
    fetchMessages();

    // Dengar pesan baru
    socket.on("receive_group_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_group_message");
    };
  }, [groupId]);

  const sendMessage = () => {
    const senderId = "123"; // ID pengguna saat ini
    socket.emit("send_group_message", { groupId, senderId, content: message });
    setMessages((prev) => [...prev, { senderId, content: message }]);
    setMessage("");
  };

  return (
    <div>
      <h2>Group Chat</h2>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.senderId}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default GroupChat;
