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
  Button,
} from "@mui/material";

import { InsertDriveFile, Send, Block } from "@mui/icons-material";

interface IChatBody {
  socket: any;
}

const ChatBody = ({ socket }: IChatBody) => {
  const [messages, setMessages] = useState<Array<any>>([]);
  const [typingStatus, setTypingStatus] = useState("");
  const [time, setTime] = useState<Boolean>(false);
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<Array<FileList>>([]);

  const username = localStorage.getItem("userName");

  socket.on("msgResponse", (data: any) => {
    console.log(data);
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

    if (message.trim() && username !== undefined && message.length < 900) {
      socket.emit("msgSend", {
        text: message,
        files: true,
        name: username,
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });

      socket.emit("typing", ``);
      setMessage("");
    }
  };

  const handleTyping = () => {
    socket.emit("typing", `${localStorage.getItem("userName")} is typing ...`);
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
      <CardHeader title="General" />
      <CardContent
        id="messages"
        sx={{ height: "100%", maxHeight: "71vh", overflowX: "auto", px: 0 }}
      >
        {messages.map((r, i) =>
          r.id !== "SYSTEM" ? (
            <Container key={i} sx={{ mb: 2, right: 0, display: "flex" }}>
              <Card
                sx={{
                  minWidth: "10vw",
                  maxWidth: "45vw",
                  textAlign: r.id === "SYSTEM" ? "center" : "left",
                  mr: 0,
                  ml: r.socketID === socket.id ? "auto" : 0,
                }}
                elevation={2}
              >
                {r.socketID === socket.id ? (
                  <CardHeader subheader="You" />
                ) : (
                  <CardHeader subheader={r.name} />
                )}
                <CardContent sx={{ pt: 0 }}>
                  <Typography variant="body2" component="div" margin="normal">
                    {r.id === "SYSTEM" ? r.name : null} {r.text}
                  </Typography>
                </CardContent>
              </Card>
            </Container>
          ) : (
            <Container key={i} sx={{ mb: 2, right: 0, display: "flex" }}>
              <Box sx={{ width: "100%" }}>
                <Typography variant="body2" sx={{ textAlign: "center" }}>
                  {r.name} {r.text}
                </Typography>
              </Box>
            </Container>
          )
        )}
      </CardContent>

      <CardActions>
        <Box sx={{ width: "100%" }}>
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
            <IconButton component="label" sx={{ p: "10px" }}>
              <InsertDriveFile />
              <input
                onChange={(e: BaseSyntheticEvent) =>
                  setFiles([...files, e.target.files])
                }
                type="file"
                hidden
              />
            </IconButton>

            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Message"
              onChange={(e: BaseSyntheticEvent) => setMessage(e.target.value)}
              onKeyDown={handleTyping}
              onKeyUp={handleTypingStop}
              value={message}
              autoFocus
            />

            <IconButton
              type="submit"
              sx={{ p: "10px" }}
              disabled={message.length > 900}
              color={message.length < 700 ? "inherit" : "warning"}
            >
              {message.length < 900 ? <Send /> : <Block />}
            </IconButton>
          </Paper>
          <Typography variant="caption">{typingStatus}</Typography>
        </Box>
      </CardActions>
    </Card>
  );
};

export default ChatBody;
