import io from "socket.io-client";

import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./views/Login";
import Chat from "./views/Chat";

const socket = io("http://localhost:4000", { transports: ["websocket"] });

interface IUser {
  name: string;
  id: string;
}

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Login socket={socket} />} />
          <Route path="/chat" element={<Chat socket={socket} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
