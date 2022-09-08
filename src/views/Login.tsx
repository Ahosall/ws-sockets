import { BaseSyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  FormGroup,
  Grid,
  Link,
  Stack,
  Typography,
  TextField,
} from "@mui/material";

const Login = ({ socket }: any) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>("");

  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    localStorage.setItem("userName", userName);
    socket.emit("newUser", { userName, socketID: socket.id });
    navigate("/chat");
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={3}>
        <Card sx={{ minWidth: 415 }} color="secondary">
          <CardContent>
            <Typography
              align="center"
              variant="h5"
              component="div"
              margin="normal"
            >
              WS Chat
            </Typography>
            <FormControl
              id="formLogin"
              sx={{ my: 3 }}
              component="form"
              variant="standard"
              onSubmit={handleSubmit}
              fullWidth
            >
              <FormGroup>
                <Stack spacing={2}>
                  <TextField
                    fullWidth
                    name="login"
                    label="Nome de Usuário"
                    variant="outlined"
                    autoComplete="off"
                    autoFocus
                    required
                    onChange={(e: BaseSyntheticEvent) =>
                      setUserName(e.target.value)
                    }
                  />
                </Stack>
              </FormGroup>
            </FormControl>
          </CardContent>
          <CardActions>
            <Button
              type="submit"
              form="formLogin"
              variant="contained"
              fullWidth
            >
              Entrar
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;
