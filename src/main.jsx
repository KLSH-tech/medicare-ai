import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { AppContextProvider } from "./ai-chat/context/AppContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <AppContextProvider>
      <App />
      </AppContextProvider>
    </Router>
  </React.StrictMode>
);