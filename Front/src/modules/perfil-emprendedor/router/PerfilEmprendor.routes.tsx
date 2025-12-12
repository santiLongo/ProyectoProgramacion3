import { Route, Routes } from "react-router-dom";
import { PerfilEmprendedor } from "../view/PerfilEmprendedor";
import type { PerfilEmprendedorProps } from "../models/emprendedor/perfil-emprendedor-props";

export function PerfilEmprendedorRoutes(props: PerfilEmprendedorProps) {
  return (
    <Routes>
        <Route path="/" element={<PerfilEmprendedor isEditable={props.isEditable}/>}/>
    </Routes>
  );
}