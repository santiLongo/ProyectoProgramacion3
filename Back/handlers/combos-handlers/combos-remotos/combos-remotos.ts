import Sector from "../../../schemas/sector.ts";
import type { ComboModel } from "../Models/combosModels.ts";

export class CombosRemotos{
    
    public async GetSectorEmpresa(): Promise<Array<ComboModel>> {
        let response: ComboModel[] = [];
        try{
            const data = await Sector.find({})

            data.forEach((dato) => {
                const resp: ComboModel = {
                    numero: Number(dato._id),
                    descripcion: dato.name
                }
                response.push(resp)
            })

            return response
        }catch (error){
            console.log('error');
        }
        return response;
    }
}