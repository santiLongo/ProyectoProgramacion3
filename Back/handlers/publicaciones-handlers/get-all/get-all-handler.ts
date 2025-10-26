import mongoose, { type ObjectId } from "mongoose"
import Pubicacion from "../../../schemas/publicacion.ts";
import Empresa from "../../../schemas/empresa.ts";

export class GetAllPublicacionesHandler {
    private _dataBase = new mongoose.Connection;

    public async handler(idEmpresa?: number): Promise<Array<GetAllCardsPublicaciones>>{
        let  response: GetAllCardsPublicaciones[] = []
        
        try{
            const publicaciones = await Pubicacion.find({empresa: idEmpresa})
            .populate<{ empresa: { name: string } }>('empresa')
            .populate<{ sector: { name: string } }>('sector');


            publicaciones.forEach((publicacion) => {
                const data: GetAllCardsPublicaciones = {
                    titulo: publicacion.titulo,
                    descripcion: publicacion.descripcion,
                    empresaName: publicacion.empresa?.name,
                    sector: publicacion.sector?.name,
                    tags: publicacion.tags,
                }

                response.push(data);
            })
            
        }catch (error){
            console.log(error);
        }

        return response;
    }  
}

interface GetAllCardsPublicaciones {
    titulo: string;
    descripcion: string;
    sector: string;
    tags: string;
    empresaName: string;
    empresaImg?: string;
}