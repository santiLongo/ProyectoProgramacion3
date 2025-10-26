import type { ComboModel } from "../Models/combosModels.ts";

export class CombosLocales {

    public GetEstadoPublicacion(): Array<ComboModel>{
        const data: ComboModel[] = [
            {
                numero: 1,
                descripcion: 'Activo'
            },
            {
                numero: 2,
                descripcion: 'Respuesta del Emprendedor'
            },
            {
                numero: 3,
                descripcion: 'Rechazado'
            },
        ]   
        return data;
    } 
}

