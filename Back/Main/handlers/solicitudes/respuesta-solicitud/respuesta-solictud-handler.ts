import { ObjectId } from "mongodb";
import { Roles } from "../../../enums/roles.ts";
import Solicitud from "../../../schemas/solicitud.ts";
import type { RespuestaSolcitudCommand } from "./models/respuesta-solicitud-command.ts";

export class RespuestaSolcitudHandler{
    async handle(command: RespuestaSolcitudCommand, idSoporte: string){
        this.Validar(command);

        const solicitud = await Solicitud.findById(command.idSolcitud).populate<{user: {role: string}}>('user');

        if(!solicitud){
            throw new Error('No se encontro la solicitud');
        }

        if(command.respuesta){
            solicitud.user.role = Roles.emprendedor;
        }

        solicitud.userAutoriza = new ObjectId(idSoporte);
        solicitud.estado = true;
        solicitud.save();
    }
    private Validar(command: RespuestaSolcitudCommand){
        if(command.idSolcitud === undefined || command.idSolcitud.trim() === ''){
            throw new Error('Se necesita un Id de solicitud para esta accion');
        }
        if(command.respuesta === undefined){
            throw new Error('No se encuentra una respuesta para esta solicitud');
        }
    }
}