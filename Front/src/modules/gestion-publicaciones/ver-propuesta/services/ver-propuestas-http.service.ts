import { environments } from "../../../../configs/enviroments";
import { get } from "../../../../services/http.service";
import type { PropuestaGridModel } from "../models/propuestas-grid.model";

const urlPropuestas = environments.apiUrl + 'propuestas/';

export const getAll = async (idPublicacion: string, estado: string): Promise<PropuestaGridModel[]> => {
    const fullUrl = urlPropuestas + 'getAll';

    const query = {
        idPublicacion: idPublicacion,
        estado: estado
    }

    const data = await get(fullUrl, query);

    return data;
}