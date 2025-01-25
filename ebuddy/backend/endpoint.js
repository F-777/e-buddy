const express = require("express");
const router = express.Router();
const Group = require("./models/Group"); // Model Grup
const User = require("./models/User"); // Model Pengguna

// Buat grup baru
router.post("/api/groups", async (req, res) => {
  const { groupName, members } = req.body;
  try {
    const group = new Group({ groupName, members });
    await group.save();
    res.status(201).json({ message: "Group created successfully", group });
  } catch (error) {
    res.status(500).json({ error: "Failed to create group" });
  }
});

// Tambahkan pesan ke grup
router.post("/api/groups/:groupId/messages", async (req, res) => {
  const { groupId } = req.params;
  const { sender, content } = req.body;
  try {
    const group = await Group.findById(groupId);
    group.messages.push({ sender, content });
    await group.save();
    res.status(200).json({ message: "Message sent", group });
  } catch (error) {
    res.status(500).json({ error: "Failed to send message" });
  }
});

// Ambil pesan grup
router.get("/api/groups/:groupId/messages", async (req, res) => {
  const { groupId } = req.params;
  try {
    const group = await Group.findById(groupId).populate("messages.sender", "username");
    res.status(200).json({ messages: group.messages });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

module.exports = router;
