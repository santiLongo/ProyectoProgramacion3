import { environments } from "../../../configs/enviroments";
import { get } from "../../../services/http.service";
import type { GetPerfilEmprendedorCommand } from "../models/emprendedor/get-perfil-emprendedor-command";
import type { GetPerfilEmprendedorResponse } from "../models/emprendedor/get-perfil-emprendedor-response";

const url = environments.apiUrl + 'perfil/';

export async function getEmprendedor(command: GetPerfilEmprendedorCommand): Promise<GetPerfilEmprendedorResponse> {
    const fullUrl = url + 'get-emprendedor';
    return await get<GetPerfilEmprendedorResponse>(fullUrl, command);
}