import { environments } from "../../../configs/enviroments";
import { get } from "../../../services/http.service";
import type { GetPerfilEmprendedorCommand } from "../models/emprendedor/get-perfil-emprendedor-command";
import type { GetPerfilEmprendedorResponse } from "../models/emprendedor/get-perfil-emprendedor-response";
import type { UpdatePerfilEmprendedorCommand } from "../models/emprendedor/update-perfil-emprendedor";

const url = environments.apiUrl + 'perfil/';

export async function getEmprendedor(command: GetPerfilEmprendedorCommand): Promise<GetPerfilEmprendedorResponse> {
    const fullUrl = url + 'get-emprendedor';
    return await get<GetPerfilEmprendedorResponse>(fullUrl, command);
}

export async function upupdateEmprendedorda(command: UpdatePerfilEmprendedorCommand) {
    const fullUrl = url + 'update-emprendedor';
    return await get<GetPerfilEmprendedorResponse>(fullUrl, command);
} 