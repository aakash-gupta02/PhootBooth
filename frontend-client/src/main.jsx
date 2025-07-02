import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { PhotoBoothProvider } from "./context/PhotoBoothContext.jsx";

createRoot(document.getElementById("root")).render(
  <PhotoBoothProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </PhotoBoothProvider>
);
