import { environments } from "../../../../configs/enviroments";
import { get } from "../../../../services/http.service";
import type { PropuestaGridModel } from "../models/propuestas-grid.model";

const urlPropuestas = environments.apiUrl + 'propuestas/';
const urlEmprendedores = environments.apiUrl + 'emprendedores/';

export const getAll = async (idPublicacion: string, estado: string): Promise<PropuestaGridModel[]> => {
    const fullUrl = urlPropuestas + 'getAll';

    const query = {
        idPublicacion: idPublicacion,
        estado: estado
    }

    const data = await get(fullUrl, query);

    return data;
}

export const getEmprendedorById = async (idEmprendedor: string) => {
    const fullUrl = urlEmprendedores + 'get';
    const query = {
        idEmprendedor: idEmprendedor
    }
    return await get(fullUrl, query);
    
}