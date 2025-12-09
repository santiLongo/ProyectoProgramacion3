import { Route, Routes } from "react-router-dom";
import { MiPerfil, type MiPerfilProps } from "../view/MiPerfil";
import { VerPublicacionRouter } from "../../ver-publicacion/router/VerPublicacionRouter";

export function MiPerfilRoutes(props: MiPerfilProps) {
  return (
    <div className="MiPerfilRouter">
      <Routes>
        <Route path="/" element={<MiPerfil isEditable={props.isEditable} />} />
        <Route path="/publicacion/:id" element={<VerPublicacionRouter />} />
      </Routes>
    </div>
  );
}
