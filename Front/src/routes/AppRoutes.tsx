import { Route, Routes } from "react-router-dom";
import { GestionPublicacionesRouter } from "../modules/gestion-publicaciones/router/GestionPublicacionesRouter";
import { MiPerfilRouter } from "../modules/mi-perfil/router/MiPerfilRouter";
import { HomeRouter } from "../modules/home/router/HomeRouter";

function AppRoutes() {
  return (
    <div className="AppRoutes">
      <Routes>
        <Route path="/" element={<HomeRouter />} />
        <Route
          path="/gestion-publicaciones/*"
          element={<GestionPublicacionesRouter />}
        />
        <Route path="/mi-perfil/*" element={<MiPerfilRouter />} />
      </Routes>
    </div>
  );
}

export default AppRoutes;
