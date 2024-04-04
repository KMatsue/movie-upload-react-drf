import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Login from "./components/Login.jsx";
import { CookiesProvider } from "react-cookie";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CookiesProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/video" element={<App />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </CookiesProvider>
  </React.StrictMode>
);
