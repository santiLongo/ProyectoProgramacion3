import { environments } from "../../../../configs/enviroments";
import { get, post } from "../../../../services/http.service";
import type { PropuestaGridModel } from "../models/propuestas-grid.model";
import type { PropuestasFilterModel } from "../models/propuestas-filter.model";

const urlPropuestas = environments.apiUrl + 'propuestas/';
const urlPublicaciones = environments.apiUrl + 'gestion-publicaciones/';
const urlEmprendedores = environments.apiUrl + 'emprendedores/';

export const getAll = async (commnad: PropuestasFilterModel): Promise<PropuestaGridModel[]> => {
    const fullUrl = urlPropuestas + 'getAll';

    const data = await get(fullUrl, commnad);

    return data;
}

export const getEmprendedorById = async (idEmprendedor: string) => {
    const fullUrl = urlEmprendedores + 'get';
    const query = {
        idEmprendedor: idEmprendedor
    }
    return await get(fullUrl, query);
    
}

export const updateEstadoPublicacion = (idPropuesta: string, estado: string) => {
    const fullUrl = urlPropuestas + 'updateEstado';
    const body = {
        idPropuesta: idPropuesta,
        estado: estado
    }
    post(fullUrl, body);
}

export const getPubliById = async (idPublicacion: string) => {
    const fullUrl = urlPublicaciones + 'get';
    const query = {
        idPublicacion: idPublicacion
    }
    return await get(fullUrl, query);
}