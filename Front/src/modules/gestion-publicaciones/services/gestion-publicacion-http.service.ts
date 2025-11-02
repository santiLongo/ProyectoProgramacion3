import { environments } from "../../../configs/enviroments"
import { get, post } from "../../../services/http.service";
import type { GestionPublicacionesGetAll } from "../models/gestion-publicaciones.model";
import type { PublicacionFormModel } from "../models/publicacion-form.model";

const urlPublicaciones = environments.apiUrl +  'gestion-publicaciones/'

export const getAll = async (): Promise<GestionPublicacionesGetAll[]> => {
    const fullUrl = urlPublicaciones + 'getAll'
    
    try{
        const data = await get(fullUrl);

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

export const eliminar = async (idPublicacion: string): Promise<any> => {
    const fullUrl  =  urlPublicaciones + 'delete';
    const params = { idPublicacion: idPublicacion}
    try{
        const response = await post(fullUrl, params);

        return response;
    }catch (error){
        console.log(error);
    }

    return;
}

export const update = async (form: PublicacionFormModel): Promise<any> => {
    const fullUrl  =  urlPublicaciones + 'update';

    try{
        const response = await post(fullUrl, form);

        return response;
    }catch (error){
        console.log(error);
    }

    return;
}