import React from "react";
import ReactDOM from "react-dom/client";
import "./Main.css";
import App from "./App";
import NewUser from "./Utils/NewUser";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <NewUser />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);