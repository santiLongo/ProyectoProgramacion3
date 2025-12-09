import Propuesta from "../../../schemas/propuesta.ts";
import Voto from "../../../schemas/voto.ts";
import type { VotarPropuestaCommand } from "./models/votar-propuesta-command.ts";

export class VotarPropuestaHandler{
    public async handle(command: VotarPropuestaCommand, idUsuario: string){
        if(command.voto == 0 || command.voto == undefined || command.voto == null){
            throw new Error("Debe contener un voto mayor a 0");
        }

        if(command.propuesta == null || command.propuesta == undefined){
            throw new Error("Se necesita una propuesta para votar");
        }

        const propuesta = await Propuesta.findById(command.propuesta);

        if(!propuesta){
            throw new Error("No se encontro la propuesta para votar");
        }

        Voto.create({
            propuesta: propuesta._id,
            user: idUsuario,
            valor: command.voto
        })
    }
}