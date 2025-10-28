import { ExceptionMap } from "antd/es/result";
import { environments } from "../../../configs/enviroments"
import { get } from "../../../hooks/http.service";
import type { GestionPublicacionesGetAll } from "../models/gestion-publicaciones.model";

const urlPublicaciones = environments.apiUrl +  'publicaciones/'

export const getAll = async (idEmpresa: number): Array<GestionPublicacionesGetAll> => {
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