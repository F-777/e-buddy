router.get("/api/groups/:groupId/messages", async (req, res) => {
    const { groupId } = req.params;
    const { page = 1, limit = 10 } = req.query; // Default 10 pesan per halaman
    try {
      const group = await Group.findById(groupId)
        .populate("messages.sender", "username")
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
      res.status(200).json({ messages: group.messages });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });
  