import { environments } from "../../../configs/enviroments";
import { get, post } from "../../../services/http.service";
import type { RespuestaSolcitudCommand } from "../models/respuesta-solicitud-command";

const url = environments.apiUrl + 'solicitudes/';

export async function getSolicitudes() {
    const fullUrl = url + 'getAll';
    return await get(fullUrl);
}

export async function respuesta(command: RespuestaSolcitudCommand) {
    const fullUrl = url + 'repuesta';
    return await post(fullUrl, command);
}