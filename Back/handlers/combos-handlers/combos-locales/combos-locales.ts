import type { ComboModel } from "../Models/combosModels.ts";

export class CombosLocales {

    public GetEstadoPublicacion(): Array<ComboModel>{
        const data: ComboModel[] = [
            {
                numero: 1,
                descripcion: 'Aceptada'
            },
            {
                numero: 2,
                descripcion: 'Pendiente'
            },
            {
                numero: 3,
                descripcion: 'Rechazado'
            },
        ]   
        return data;
    } 
}

