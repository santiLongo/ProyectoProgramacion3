import Propuesta from "../../../schemas/propuesta.ts";
import Voto from "../../../schemas/voto.ts";

export class GetAllPropuestasHandler {
  public async handler(command: GetAllPropuestasCommand): Promise<PropuestaGridModel[]> {
    
    if(command.idPublicacion == null || command.idPublicacion == ''){
        throw new Error('Se necesita un id de publicacion para esta accion');
    }

    let estado;
    switch (Number(command.estado)) {
        case 1:
            estado = 'aceptada';
            break;
        case 2:
            estado = 'pendiente';
            break;
        case 3:
            estado = 'rechazado';
            break;
        default:
            estado = null;
            break;
    }

    const propuestas = await Propuesta.find({
        publicacion: command.idPublicacion,
        estado: estado || { $exists: true },
        titulo: { $regex: command.titulo || '', $options: 'i' },
        presupuesto: {
            $gte: command.presupuestoMin || 0,
            $lte: command.presupuestoMax || Number.MAX_SAFE_INTEGER,
        },
        emprendedor: command.emprendedor || { $exists: true },
    })
            .populate({
                path: 'emprendedor',
                populate: { 
                    path: 'user',
                    select: 'userName'
                }
            });

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
    titulo: string;
    estado: number;
    presupuestoMin: number;
    presupuestoMax: number;
    emprendedor: string;
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