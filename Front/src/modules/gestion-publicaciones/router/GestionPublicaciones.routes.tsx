import { Route, Routes } from "react-router-dom";
import { GestionPublicaciones } from "../view/GestionPublicaciones";
import { VerPropuestaRouter } from "../views/ver-propuesta/router/VerPropuestaRouter";
import { MiPerfilRouter } from "../../mi-perfil/router/MiPerfilRouter";
import { VerPublicacionRouter } from "../../ver-publicacion/router/VerPublicacionRouter";

export function GestionPublicacionesRoutes() {
  return (
    <div className="GestionPublicacionesRouter">
      <Routes>
        <Route path="/" element={<GestionPublicaciones />} />
        <Route
          path="/ver-propuesta/:id/:title"
          element={<VerPropuestaRouter />}
        />
        <Route path="/perfil/:id" element={<MiPerfilRouter />} />
        <Route path="/publicacion/:id" element={<VerPublicacionRouter />} />
      </Routes>
    </div>
  );
}
