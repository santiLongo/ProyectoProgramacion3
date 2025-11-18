import Propuesta from "../../../schemas/propuesta.ts";
import Voto from "../../../schemas/voto.ts";

export class GetAllPropuestasHandler {
  public async handler(command: GetAllPropuestasCommand): Promise<PropuestaGridModel[]> {
    
    if(command.idPublicacion == null || command.idPublicacion == ''){
        throw new Error('Se necesita un id de publicacion para esta accion');
    }

    let propuestas;

    switch (command.estado) {
        case 'Aceptadas':
            propuestas = await Propuesta.find({publicacion: command.idPublicacion, estado: 'aceptada'})
            .populate({
                path: 'emprendedor',
                populate: { 
                    path: 'user',
                    select: 'userName'
                }
            });
            break;
        case 'Rechazadas':
            propuestas = await Propuesta.find({publicacion: command.idPublicacion, estado: 'rechazada'})
            .populate({
                path: 'emprendedor',
                populate: { 
                    path: 'user',
                    select: 'userName'
                }
            });
            break;
        case 'Pendientes':
            propuestas = await Propuesta.find({publicacion: command.idPublicacion, estado: 'pendiente'})
            .populate({
                path: 'emprendedor',
                populate: { 
                    path: 'user',
                    select: 'userName'
                }
            });
            break;
        default:
            propuestas = await Propuesta.find({publicacion: command.idPublicacion})
            .populate({
                path: 'emprendedor',
                populate: { 
                    path: 'user',
                    select: 'userName _id'
                }
            });
    }

    const votos = await Voto.find({idPublicacion: command.idPublicacion});

    const promVotos = votos.reduce((acc, voto) => acc + voto.valor, 0) / (votos.length || 1);

    const response: PropuestaGridModel[] = propuestas.map((propuesta) => ({
        titulo: propuesta.titulo,
        descripcion: propuesta.descripcion,
        presupuesto: propuesta.presupuesto,
        estado: propuesta.estado,
        promVotos: promVotos,
        cantidadVotos: votos.length,
        idUser: propuesta.emprendedor.user?._id.toString(),
        emprendedor: propuesta.emprendedor.user?.userName,
    }));

    return response;
  }
}

export interface GetAllPropuestasCommand {
    idPublicacion: string;
    estado?: string;
}

interface PropuestaGridModel{
    titulo: string;
    descripcion: string;
    presupuesto: number;
    estado: string;
    promVotos: number;
    cantidadVotos: number;
    idUser: string;
    emprendedor: string;
}