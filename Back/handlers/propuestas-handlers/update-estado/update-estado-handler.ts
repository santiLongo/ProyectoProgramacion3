import { ObjectId } from "mongodb";
import Propuesta from "../../../schemas/propuesta.ts";

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

        propuesta!.estado = new ObjectId(command.estado);

        await propuesta!.save();
    }
}

export interface UpdateEstadoPropuestaCommand {
    idPropuesta: string;
    estado: string;
}