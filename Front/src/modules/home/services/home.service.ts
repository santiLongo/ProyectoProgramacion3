import { environments } from "../../../configs/enviroments"
import { get } from "../../../services/http.service";
import type { GestionPublicacionesGetAll } from "../../gestion-publicaciones/models/gestion-publicaciones.model";

const urlPublicaciones = environments.apiUrl +  'home-publicaciones/'

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
