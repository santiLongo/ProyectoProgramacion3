import { EstadosPropuestas } from "../../../enums/estados-propuestas.ts";
import Propuesta from "../../../schemas/propuesta.ts";
import type { UpdatePropuestaCommand } from "./models/update-propuesta-command.ts";

export class UpdatePropuestaHandler{
    async handle(commnad: UpdatePropuestaCommand){
        this.Validar(commnad);

        const propuesta = await Propuesta.findById(commnad.id);

        if(!propuesta){
            throw new Error('No se encontro la propuesta');
        }

        if(propuesta.estado.toString() !== EstadosPropuestas.Pendiente){
            throw new Error('La propuesta no puede ser editada por su estado actual');
        }

        propuesta.descripcion = commnad.descripcion;
        propuesta.presupuesto = commnad.presupuesto;
        propuesta.save();
    }

    private Validar(commnad: UpdatePropuestaCommand){
        if(commnad.id === undefined || commnad.id.trim() === ''){
            throw new Error('Id de propuesta invalido');
        }
        if(commnad.descripcion === undefined || commnad.descripcion.trim() === ''){
            throw new Error('Descripcion de propuesta invalido');
        }
        if(commnad.presupuesto === undefined || commnad.presupuesto === 0){
            throw new Error('Presupuesto de propuesta invalido');
        }
    }
}