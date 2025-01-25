socket.on("receive_group_message", (data) => {
    if (document.hidden) {
      new Notification("New message in group", {
        body: `${data.senderId}: ${data.content}`,
      });
    }
    setMessages((prev) => [...prev, data]);
  });
  
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);
  