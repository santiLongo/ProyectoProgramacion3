import { environments } from "../../../configs/enviroments";
import { get, post } from "../../../services/http.service";
import type { ComentarPropuestaCommand } from "../models/comentar-propuesta-commando";
import type { ComentarPublicacionCommand } from "../models/comentar-publicacion-command";
import type { GetPublicacionCommand } from "../models/get-publicacion-command";

const publicacionUrl = environments.apiUrl + 'publicacion/'
const propuestaUrl = environments.apiUrl + 'propuestas/'

export async function getPublicacion(command: GetPublicacionCommand) {
    const fullUrl = publicacionUrl + 'get-publi';

    const response = await get(fullUrl, command);

    return response
}

export function comentarPublicacion(command: ComentarPublicacionCommand){
    const fullUrl = publicacionUrl + 'comentar';
    post(fullUrl, command);
}

export function comentarPropuesta(command: ComentarPropuestaCommand){
    const fullUrl = propuestaUrl + 'comentar';
    post(fullUrl, command);
}
