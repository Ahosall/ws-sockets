import React from "react";
import ReactDOM from "react-dom/client";

import { ThemeProvider, CssBaseline } from "@mui/material";

import App from "./App";

import { dark } from "./utils/themes";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ThemeProvider theme={dark}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);
