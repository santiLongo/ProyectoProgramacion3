import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../modules/login/Login";
import { ProtectedRoute } from "./ProtectedRoute";
import { AuthProvider } from "../context/AuthContext";
import App from "../App";
import Home from "../modules/home/Home";
import { GestionPublicacionesRouter } from "../modules/gestion-publicaciones/GestionPublicacionesRouter";

function MainRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<ProtectedRoute element={<App />} />} /> 
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default MainRoutes;
