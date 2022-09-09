import { Grid } from "@mui/material";
import { Navigate } from "react-router-dom";

import ChatBar from "../components/ChatBar";
import ChatBody from "../components/ChatBody";
import ChatHeader from "../components/ChatHeader";

const Chat = ({ socket }: any) => {
  const username = localStorage.getItem("userName");
  if (!username || socket.connected === false) return <Navigate to="/" />;

  return (
    <>
      <ChatHeader />
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        sx={{ my: "2px" }}
        spacing={2}
      >
        <Grid item xs={2}>
          <ChatBar socket={socket} />
        </Grid>
        <Grid item xs={9}>
          <ChatBody socket={socket} />
        </Grid>
      </Grid>
    </>
  );
};

export default Chat;
