import ComentarioPropuesta from '../../../schemas/comentario-propuesta.ts'
import '../../../schemas/comentario-publicacion.ts'
import ComentarioPublicacion from '../../../schemas/comentario-publicacion.ts'
import Propuesta from '../../../schemas/propuesta.ts'
import Publicacion from '../../../schemas/publicacion.ts'
import Voto from '../../../schemas/voto.ts'
import type { GetPublicacionCommand } from './models/get-publicacion-command.ts'
import type {
  ComentariosPropuestasResponse,
  ComentariosPublicacionResponse,
  GetPublicacionResponse,
  PropuestasResponse,
} from './models/get-publicacion-response.ts'

export class GetPublicacionHandler {
  public async handle(command: GetPublicacionCommand, idUsuario: string): Promise<GetPublicacionResponse> {
    if (command.id == undefined || command.id == '') {
      throw new Error(
        'Hubo un problema con la solicitud para identificar la publicacion, comuniquese con soporte',
      )
    }

    const publicacion = await Publicacion.findOne({ _id: command.id })
      .populate<{ empresa: { name: string } }>('empresa')
      .populate<{ estado: { name: string } }>('estado')

    if (!publicacion) {
      throw new Error('No se encontro la publicacion solicitada')
    }

    const comentarios = await ComentarioPublicacion.find({
      publicacion: publicacion._id,
    }).populate<{ usuario: { userName: string } }>('usuario')

    const propuestas = await Propuesta.find({ publicacion: publicacion._id })
      .populate<{ emprendedor: { nombre: string; apellido: string } }>('emprendedor')
      .populate<{ estado: { name: string } }>('estado')

    const propuestasResponse: Array<PropuestasResponse> = await Promise.all(
      propuestas.map(async (o) => {
        const votos = await Voto.find({ propuesta: o._id })
        const promedioVotos =
          votos.length > 0 ? votos.reduce((acc, voto) => acc + voto.valor, 0) / votos.length : 0;

        const puedoVotar = votos.findIndex((v) => v.user == idUsuario);

        const comentariosDocs = await ComentarioPropuesta.find({ propuesta: o._id }).populate<{usuario:{userName: string}}>('usuario')

        const comentarios: Array<ComentariosPropuestasResponse> = comentariosDocs.map<ComentariosPropuestasResponse>((c) => ({
          usuario: c.usuario.userName,
          comentario: c.texto,
          fecha: c.fecha,
        }))

        return {
          id: o._id.toString(),
          emprendedor: `${o.emprendedor.nombre} ${o.emprendedor.apellido}`,
          titulo: o.titulo,
          descripcion: o.descripcion,
          estado: o.estado.name,
          fecha: o.fecha,
          promedioVotos,
          puedoVotar: puedoVotar == -1,
          comentarios,
        } as PropuestasResponse
      }),
    )

    const response: GetPublicacionResponse = {
      publicacion: {
        titulo: publicacion?.titulo!,
        descripcion: publicacion?.descripcion!,
        empresa: publicacion?.empresa.name!,
        estado: publicacion?.estado.name!,
        fechaPublicacion: publicacion?.fechaAlta!,
        tags: publicacion?.tags!,
      },
      comentarios: comentarios?.map<ComentariosPublicacionResponse>((o) => {
        return {
          usuario: o.usuario.userName,
          comentario: o.texto,
          fecha: o.fecha,
        }
      }),
      propuestas: propuestasResponse
    }

    return response
  }
}
