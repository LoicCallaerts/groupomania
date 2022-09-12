import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Pages
import SignIn from "./Pages/signIn";
import SignUp from "./Pages/signUp";
import Home from "./Pages/home";
// Theme
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Lato from "./font/Lato-Regular.ttf";
import CssBaseline from "@mui/material/CssBaseline";
// Misc
import reportWebVitals from "./reportWebVitals";



const theme = createTheme({
  typography: {
    fontFamily: "Lato",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Lato-Regular.ttf';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Lato'), local('Lato-Regular'), url(${Lato}) format('ttf');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
