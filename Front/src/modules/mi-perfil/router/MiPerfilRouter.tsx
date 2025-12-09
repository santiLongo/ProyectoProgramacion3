import type React from "react";
import { MiPerfilRoutes } from "./MiPerfil.routes";
import type { MiPerfilProps } from "../view/MiPerfil";

export const MiPerfilRouter:React.FC<MiPerfilProps> = ({isEditable}) => {
    return (
        <MiPerfilRoutes isEditable={isEditable}/>
    );
}