import React from "react";
import ReactDOM from "react-dom/client";
import "normalize.css";
import StyledApp from "./components/App";
import { ThemeProvider } from "styled-components";
import reportWebVitals from "./reportWebVitals";

const theme = {
  fontFamily: '"Ubuntu Mono", monospace',
  fontSizeBase: "15px",
  lineHeightBase: "2em",
  maxAppWidth: "44rem",
  white: "white",
  dark: "rgb(30, 30, 30)",
  light: "rgb(180, 180, 180)",
  danger: "rgb(141, 0, 0)",
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <StyledApp />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
