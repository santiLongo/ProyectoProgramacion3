import { environments } from "../../../configs/enviroments"
import { get, post } from "../../../hooks/http.service";
import type { GestionPublicacionesGetAll } from "../models/gestion-publicaciones.model";
import type { PublicacionFormModel } from "../models/publicacion-form.model";

const urlPublicaciones = environments.apiUrl +  'publicaciones/'

export const getAll = async (idEmpresa: number): Promise<GestionPublicacionesGetAll[]> => {
    const fullUrl = urlPublicaciones + 'getAll'
    //
    const params = { idEmpresa: idEmpresa };
    //
    try{
        const data = await get(fullUrl, params);

        return data;
    }catch (error){
        console.log(error)
    }

    return [];
}

export const create = async (form: PublicacionFormModel): Promise<any> => {
    const fullUrl  =  urlPublicaciones + 'create';

    try{
        const response = await post(fullUrl, form);

        return response;
    }catch (error){
        console.log(error);
    }

    return;
}