// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MainRoutes from "./routes/MainRoutes.tsx";
import { GlobalErrorModal } from "./components/error-result/ErrorResult.tsx";

createRoot(document.getElementById("root")!).render(
  <>
    <GlobalErrorModal />
    <MainRoutes></MainRoutes>
  </>
);
