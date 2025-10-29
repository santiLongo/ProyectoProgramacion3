import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MainRoutes from "./routes/MainRoutes.tsx";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MainRoutes></MainRoutes>
  </StrictMode>
);
