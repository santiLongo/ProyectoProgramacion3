import Propuesta from '../../../schemas/propuesta.ts'
import Voto from '../../../schemas/voto.ts'

export class GetAllPropuestasHandler {
  public async handler(command: GetAllPropuestasCommand): Promise<PropuestaGridModel[]> {
    if (command.idPublicacion == null || command.idPublicacion == '') {
      throw new Error('Se necesita un id de publicacion para esta accion')
    }

    const propuestas = await Propuesta.find({
      publicacion: command.idPublicacion,
      estado: command.estado || { $exists: true },
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
          select: 'userName',
        },
      })
      .populate({
        path: 'estado',
        select: 'name',
      })

    const response: Array<PropuestaGridModel> = await Promise.all(
      propuestas.map(async (propuesta) => {
        const votos = await Voto.find({ propuesta: propuesta._id })

        const promVotos = votos.reduce((acc, voto) => acc + voto.valor, 0) / (votos.length || 1)

        return {
          titulo: propuesta.titulo,
          descripcion: propuesta.descripcion,
          presupuesto: propuesta.presupuesto,
          estado: propuesta.estado.name,
          promVotos: promVotos,
          cantidadVotos: votos.length,
          idUser: propuesta.emprendedor.user?._id.toString(),
          emprendedor: propuesta.emprendedor.user?.userName,
          idPropuesta: propuesta._id.toString(),
        }
      }),
    )

    return response
  }
}

export interface GetAllPropuestasCommand {
  idPublicacion: string
  titulo: string
  estado: string
  presupuestoMin: number
  presupuestoMax: number
  emprendedor: string
}

interface PropuestaGridModel {
  titulo: string
  descripcion: string
  presupuesto: number
  estado: string
  promVotos: number
  cantidadVotos: number
  idUser: string
  emprendedor: string
  idPropuesta: string
}
