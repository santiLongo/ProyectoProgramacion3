import { environments } from "../../../configs/enviroments";
import { get, post } from "../../../services/http.service";
import type { GetPerfilEmprendedorCommand } from "../models/emprendedor/get-perfil-emprendedor-command";
import type { GetPerfilEmprendedorResponse } from "../models/emprendedor/get-perfil-emprendedor-response";
import type { SolicitudEmprendedorCommand } from "../models/emprendedor/solicitud-emprendedor-command";
import type { UpdatePerfilEmprendedorCommand } from "../models/emprendedor/update-perfil-emprendedor";
import type { UpdatePropuestaCommand } from "../models/emprendedor/update-propuesta-commnand";

const url = environments.apiUrl + 'perfil/';
const urlPropuesta = environments.apiUrl + 'propuestas/'

export async function getEmprendedor(command: GetPerfilEmprendedorCommand): Promise<GetPerfilEmprendedorResponse> {
    const fullUrl = url + 'get-emprendedor';
    return await get<GetPerfilEmprendedorResponse>(fullUrl, command);
}

export async function updateEmprendedor(command: UpdatePerfilEmprendedorCommand) {
    const fullUrl = url + 'update-emprendedor';
    return await post(fullUrl, command);
} 

export async function updatePropuesta(command: UpdatePropuestaCommand) {
    const fullUrl = urlPropuesta + 'update-propuesta';
    return await post(fullUrl, command);
}

export async function enviarSolicitud(command: SolicitudEmprendedorCommand){
    const fullUrl = url + 'solicitud'
    return await post(fullUrl, command);
}