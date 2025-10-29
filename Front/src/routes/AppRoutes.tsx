import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GestionPublicacionesRouter } from "../modules/gestion-publicaciones/GestionPublicacionesRouter";
import Home from "../modules/home/Home";

function AppRoutes() {
  return (
    <div className="AppRoutes">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/gestion-publicaciones/*"
          element={<GestionPublicacionesRouter />}
        />
      </Routes>
    </div>
  );
}

export default AppRoutes;
