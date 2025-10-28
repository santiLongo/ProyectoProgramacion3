import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MainRoutes from "./routes/MainRoutes.tsx";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <Layout
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: 'var(--secondary-color)' }}
    >
      <Content style={{
          padding: "0 48px",
          flex: 1,
          display: "flex",
          justifyContent: "center", // Centra horizontalmente
          alignItems: "center", // Centra verticalmente
        }}>
        <MainRoutes></MainRoutes>
      </Content>
    </Layout> */}

    <App></App>
  </StrictMode>
);
