import React from "react";
import Chat from "./Chat";
import Login from "./Login";
import Socket from "./Socket";
import loadMoreMessages from './load-more-mess';
import receive_group_message from './receive_group_message';

function App() {
    return (
        <>
          <Chat />
          <Login />
          <Socket />
          <loadMoreMessages />
          <receive_group_message />
        </>
    );
}

export default App