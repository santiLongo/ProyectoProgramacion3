import { Route, Routes } from "react-router-dom";
import { MiPerfil } from "../view/MiPerfil";

export function MiPerfilRoutes() {
  return (
    <div className="MiPerfilRouter">
      <Routes>
        <Route path="/" element={<MiPerfil />} />
      </Routes>
    </div>
  );
}
