import { BaseSyntheticEvent, useState, useEffect } from "react";

import {
  Box,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Container,
  Paper,
  Typography,
  InputBase,
  IconButton,
} from "@mui/material";

import { Send } from "@mui/icons-material";

interface IUser {
  name: string;
  id: string;
}

interface IChatBody {
  socket: any;
}

const ChatBody = ({ socket }: IChatBody) => {
  const [time, setTime] = useState<Boolean>(false);
  const [messages, setMessages] = useState<Array<any>>([]);
  const [typingStatus, setTypingStatus] = useState("");
  const [message, setMessage] = useState("");

  const username = localStorage.getItem("userName");

  socket.on("msgResponse", (data: any) => {
    setMessages([...messages, data]);
  });

  socket.on("typingResponse", (data: any) => {
    setTypingStatus(data);
  });

  useEffect(() => {
    const elMsgs = document.getElementById("messages");
    elMsgs?.scrollTo(0, elMsgs.scrollHeight);
  }, [messages]);

  const handleSend = (e: BaseSyntheticEvent) => {
    e.preventDefault();

    if (message.trim() && username != undefined) {
      socket.emit("msgSend", {
        text: message,
        name: username,
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    console.log({
      username: localStorage.getItem("userName"),
      message,
    });

    socket.emit("typing", ``);
    setMessage("");
  };

  const handleTyping = () => {
    socket.emit("typing", `${localStorage.getItem("userName")} is typing`);
  };

  const handleTypingStop = () => {
    if (time) return;
    setTime(true);
    setTimeout(() => {
      socket.emit("typing", ``);
      setTime(false);
    }, 3000);
  };

  return (
    <Card
      sx={{
        height: "88vh",
        maxWidth: "81vw",
      }}
      elevation={1}
    >
      <CardHeader
        action={<Typography variant="caption">{typingStatus}</Typography>}
        title={<Box>General </Box>}
      />
      <CardContent
        id="messages"
        sx={{ height: "100%", maxHeight: "72vh", overflowX: "auto", px: 0 }}
      >
        {messages.map((r, i) => (
          <Container key={i} sx={{ mb: 2, right: 0, display: "flex" }}>
            <Card
              sx={{
                minWidth: "10vw",
                maxWidth: "45vw",
                mr: 0,
                ml: r.socketID == socket.id ? "auto" : 0,
              }}
              elevation={2}
            >
              <CardHeader subheader={r.name} />
              <CardContent sx={{ pt: 0 }}>
                <Typography variant="body2" component="div" margin="normal">
                  {r.text}
                </Typography>
              </CardContent>
            </Card>
          </Container>
        ))}
      </CardContent>

      <CardActions>
        <Paper
          elevation={2}
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
          onSubmit={handleSend}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Mensagem"
            onChange={(e: BaseSyntheticEvent) => setMessage(e.target.value)}
            onKeyDown={handleTyping}
            onKeyUp={handleTypingStop}
            value={message}
            autoFocus
          />
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <Send />
          </IconButton>
        </Paper>
      </CardActions>
    </Card>
  );
};

export default ChatBody;
