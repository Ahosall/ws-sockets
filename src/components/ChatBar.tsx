import { useState } from "react";

import {
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemButton,
  Divider,
} from "@mui/material";

import { AccountCircle } from "@mui/icons-material";

const ChatBar = ({ socket }: any) => {
  const [users, setUsers] = useState<any>([]);

  socket.on("newUserRes", (data: any) => setUsers(data));

  return (
    <Paper elevation={2} sx={{ minHeight: "88vh" }}>
      <List sx={{ width: "100%" }}>
        <ListItem>
          <ListItemText
            primary="Usuários ativos"
            primaryTypographyProps={{
              fontSize: 15,
              fontWeight: "medium",
            }}
          />
        </ListItem>
        <Divider />
        {users.map((u: any, i: number) => (
          <ListItemButton key={i} dense>
            <ListItem>
              <ListItemAvatar>
                <AccountCircle />
              </ListItemAvatar>
              <ListItemText primary={u.userName} />
            </ListItem>
          </ListItemButton>
        ))}
      </List>
    </Paper>
  );
};

export default ChatBar;
