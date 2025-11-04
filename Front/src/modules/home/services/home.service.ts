import { environments } from "../../../configs/enviroments"
import { get, post } from "../../../services/http.service";
import type { GestionPublicacionesGetAll } from "../../gestion-publicaciones/models/gestion-publicaciones.model";
import type { FormPropuestasAltaModel } from "../models/form-propuestas-alta.model";

const urlHome = environments.apiUrl +  'home-publicaciones/';
const urlPropuestas = environments.apiUrl + 'propuestas/';

export const getAll = async (): Promise<GestionPublicacionesGetAll[]> => {
    const fullUrl = urlHome + 'getAll'

    try{
        const data = await get(fullUrl);

        return data;
    }catch (error){
        console.log(error)
    }

    return [];
}

export const create = async (form: FormPropuestasAltaModel): Promise<any> => {
    const fullUrl = urlPropuestas + 'create'

    try{
        const data = await post(fullUrl, form);

        return data;
    }catch (error){
        console.log(error)
    }

    return;
}
