import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const dark = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*::-webkit-scrollbar": {
          width: "0px",
        },
      },
    },
  },
  palette: {
    mode: "dark",
    background: {
      default: "#191622",
      paper: "#191622",
    },
    error: {
      main: red.A400,
    },
  },
});
