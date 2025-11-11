import { Route, Routes } from "react-router-dom";
import { GestionPublicaciones } from "./views/GestionPublicaciones";
import { VerPropuestaRouter } from "./ver-propuesta/VerPropuestaRouter";

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
