import Emprendedor from "../../../schemas/emprendedor.ts";
import EstadoPropuesta from "../../../schemas/estado-propuesta.ts";
import Sector from "../../../schemas/sector.ts";
import type { ComboModel } from "../Models/combosModels.ts";

export class CombosRemotos{

    public async GetSectorEmpresa(): Promise<Array<ComboModel>> {
        let response: ComboModel[] = [];
        try{
            const data = await Sector.find({})

            data.forEach((dato) => {
                const resp: ComboModel = {
                    numero: dato._id,
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

    public async GetEmprendedor(): Promise<Array<ComboModel>> {
        let response: ComboModel[] = [];
        try{
            const data = await Emprendedor.find({})

            data.forEach((dato) => {
                const resp: ComboModel = {
                    numero: dato._id,
                    descripcion: dato.nombre + ' ' + dato.apellido
                }
                response.push(resp)
            })

            return response
        }catch (error){
            console.log('error');
        }
        return response;
    }

    public async GetEstadoPublicacion(): Promise<Array<ComboModel>> {
        const data = await EstadoPropuesta.find({})

        return data.map<ComboModel>((dato) => ({
            numero: dato._id,
            descripcion: dato.name
        }))
    }
}