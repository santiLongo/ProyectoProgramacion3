import { Route, Routes } from "react-router-dom";
import { GestionPropuestas } from "./views/GestionPropuestas";

export function GestionPropuestasRoutes() {
  return (
    <div className="GestionPropuestasRouter">
      <Routes>
        <Route path="/" element={<GestionPropuestas />} />
      </Routes>
    </div>
  );
}
