const loadMoreMessages = async () => {
    const response = await axios.get(`/api/groups/${groupId}/messages?page=${page}&limit=10`);
    setMessages((prev) => [...response.data.messages, ...prev]);
    setPage((prev) => prev + 1);
  };
  
  useEffect(() => {
    loadMoreMessages();
  }, []);
  