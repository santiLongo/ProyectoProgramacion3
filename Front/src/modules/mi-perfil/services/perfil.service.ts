import { environments } from "../../../configs/enviroments";
import { get, post } from "../../../services/http.service";
import type { GetPerfilEmpresaCommand } from "../models/empresa/get-perfil-empresa-command";
import type { GetPerfilEmpresaResponse } from "../models/empresa/get-perfil-empresa-response";
import type { UpdatePerfilEmpresaCommand } from "../models/empresa/update-perfil-empresa.command";

const url = environments.apiUrl + 'perfil/';

export async function getEmpresa(command: GetPerfilEmpresaCommand): Promise<GetPerfilEmpresaResponse> {
    const fullUrl = url + 'get-empresa';
    return await get<GetPerfilEmpresaResponse>(fullUrl, command);
};

export async function updateEmpresa(command: UpdatePerfilEmpresaCommand): Promise<void> {
    const fullUrl = url + 'update-empresa';
    return await post(fullUrl, command);
};