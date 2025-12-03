import { Route, Routes } from "react-router-dom";
import { GestionPublicaciones } from "../view/GestionPublicaciones";
import { VerPropuestaRouter } from "../views/ver-propuesta/router/VerPropuestaRouter";

export function GestionPublicacionesRoutes() {
  return (
    <div className="GestionPublicacionesRouter">
      <Routes>
        <Route path="/" element={<GestionPublicaciones />} />
        <Route path="/ver-propuesta/:id/:title" element={<VerPropuestaRouter />} />
      </Routes>
    </div>
  );
}
