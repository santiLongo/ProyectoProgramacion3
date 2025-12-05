import Publicacion from "../../../schemas/publicacion.ts";

export class GetPublicacionesHandler {
    public async Handler(command: GetPublicacionesCommand): Promise<any> {
        if(command.idPublicacion === "" || command.idPublicacion === undefined){
            throw new Error("El id no puede estar vacio");
        }

        const publicacion = await Publicacion.findById(command.idPublicacion)
        .populate({
            path: 'sector',
            select: 'name'
        })
        .populate({
            path: 'estado',
            select: 'name'
        });

        return {
            titulo: publicacion?.titulo,
            categoria: publicacion?.sector?.name,
            descripcion: publicacion?.descripcion,
            tags: publicacion?.tags,
            estado: publicacion?.estado.name,
            fechaAlta: publicacion?.fechaAlta
        }
    }
}

export interface GetPublicacionesCommand {
    idPublicacion: string;
}