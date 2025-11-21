import { environments } from "../../../../configs/enviroments";
import { get } from "../../../../services/http.service";
import type { PropuestaGridModel } from "../models/propuestas-grid.model";
import type { PropuestasFilterModel } from "../models/propuestas-filter.model";

const urlPropuestas = environments.apiUrl + 'propuestas/';
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