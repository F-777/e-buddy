import React, { Suspense } from "react";
const ChatPage = React.lazy(() => import("./ChatPage"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatPage />
    </Suspense>
  );
}
