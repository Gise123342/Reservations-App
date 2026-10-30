
import React from "react";
import ReactDOM from "react-dom/client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import App from "./App";
import "./index.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2563eb"
    },
    secondary: {
      main: "#172b4d"
    },
    background: {
      default: "#f5f7fb"
    }
  },

  typography: {
    fontFamily: "Arial, sans-serif"
  },

  shape: {
    borderRadius: 10
  }
});

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
