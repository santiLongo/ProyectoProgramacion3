import type { PerfilEmprendedorProps } from "../models/emprendedor/perfil-emprendedor-props";
import { PerfilEmprendedorRoutes } from "./PerfilEmprendor.routes";

export const PerfilEmprendedorRouter:React.FC<PerfilEmprendedorProps> = ({isEditable}) => {
    return (
        <PerfilEmprendedorRoutes isEditable={isEditable}/>
    );
}