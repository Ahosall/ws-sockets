import { AppBar, Box, Toolbar, Typography, IconButton } from "@mui/material";

import { Logout } from "@mui/icons-material";
import { Navigate } from "react-router-dom";

const ChatHeader = () => {
  const handleLeave = () => {
    localStorage.removeItem("userName");
    window.location.href = "/";
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            WS Chat
          </Typography>
          <IconButton color="inherit" onClick={handleLeave}>
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ChatHeader;
