import io from "socket.io-client";

import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./views/Login";
import Chat from "./views/Chat";

import Annoucements from "./components/Annoucements";

const socket = io("https://ws-api.ahosall.repl.co", {
  transports: ["websocket"],
});

const App = () => {
  const [status, setStatus] = useState(false);

  setInterval(() => {
    setStatus(socket.connected);
  }, 5 * 1000);

  socket.on("connect", () => {
    setStatus(socket.connected);
    socket.on("disconnected", () => {
      console.log("Server disconnected");
    });

    socket.on("disconnected", () => {
      setStatus(socket.connected);
    });
  });

  return (
    <BrowserRouter>
      <div>
        <Annoucements
          status={!status}
          circular={true}
          texts={[
            {
              variant: "body2",
              value: "Wait a minute...",
            },
            {
              variant: "caption",
              value: "Server offline.",
            },
          ]}
        />
        <Routes>
          {/* Default routes*/}
          <Route path="/" element={<Login socket={socket} />} />

          {/* Chats routes*/}
          <Route path="/chat" element={<Chat socket={socket} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
