import { ObjectId } from "mongodb";
import Propuesta from "../../../schemas/propuesta.ts";
import EstadoPropuesta from "../../../schemas/estado-propuesta.ts";
import Publicacion from "../../../schemas/publicacion.ts";
import EstadoPublicacion from "../../../schemas/estado-publicacion.ts";

export class UpdateEstadoPropuestaHandler {

    constructor() {}
    public async handler(command: UpdateEstadoPropuestaCommand) {
        if(command.estado === undefined && command.idPropuesta === '' || command.idPropuesta === undefined){
            throw new Error('Los campos idPropuesta y nuevoEstado son obligatorios');
        }

        const propuesta = await Propuesta.findOne({ _id: command.idPropuesta });

        if(!propuesta){
            throw new Error('No se encontro la propuesta');
        }

        const estado = await EstadoPropuesta.findById(command.estado);

        if(!estado){
            throw new Error('El estado no es valido');
        }

        const estadoAnterior = propuesta.estado.toString();

        propuesta!.estado = estado._id;

        await propuesta!.save();



        if(estado._id.toString() === '000000000000000000000000'){
            await this.RechazarElResto(propuesta._id.toString());
            await this.FinalizarLaPublicacion(propuesta.publicacion.toString());
        } else {
            if(estadoAnterior === '000000000000000000000000'){
                await this.ReactivarPublicacion(propuesta.publicacion.toString());
            }
        }
    }

    private async RechazarElResto(idPropuestaAcpetada: string) {
        const propuestas = await Propuesta.find({_id: { $ne: idPropuestaAcpetada }});

        const RechazarEstadoId = await EstadoPropuesta.findOne({ name: /Rech/i });

        propuestas.forEach(propuesta => {
            propuesta.estado = RechazarEstadoId!._id;
            propuesta.save();
        });
    }

    private async FinalizarLaPublicacion(IdPublicacion: string) {
        const publicacion = await Publicacion.findOne({ _id: IdPublicacion });

        const FializarEstado = await EstadoPublicacion.findOne({ name: /Final/i });

        publicacion!.estado = FializarEstado!._id;

        publicacion!.save();
    }

    private async ReactivarPublicacion(IdPublicacion: string) {
        const publicacion = await Publicacion.findOne({ _id: IdPublicacion });

        const ActivarEstado = await EstadoPublicacion.findOne({ name: /Activ/i });

        publicacion!.estado = ActivarEstado!._id;

        publicacion!.save();
    }
}

export interface UpdateEstadoPropuestaCommand {
    idPropuesta: string;
    estado: string;
}