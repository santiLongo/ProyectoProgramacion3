import ComentarioPropuesta from '../../../schemas/comentario-propuesta.ts'
import ComentarioPublicacion from '../../../schemas/comentario-publicacion.ts'
import Emprendedor from '../../../schemas/emprendedor.ts'
import Solicitud from '../../../schemas/solicitud.ts'
import type { GetSolicitudesResponse } from './models/get-solicitudes.response.ts'

export class GetAllSolicitudesHandler {
  private response: Array<GetSolicitudesResponse> = []

  async handle(): Promise<GetSolicitudesResponse[]> {
    const solicitudes = await Solicitud.find({ estado: false })
      .populate<{user: {_id: string, fechaAlta: Date, email: string}}>('user')
      .exec()

    if (solicitudes) {
      this.response = await Promise.all(
        solicitudes.map(async (solicitud): Promise<GetSolicitudesResponse> => {
          const comentariosPropuestas = await ComentarioPropuesta.find({
            usuario: solicitud.user._id,
          })
          const comentariosPublicaciones = await ComentarioPublicacion.find({
            usuario: solicitud.user._id,
          })

          const emprendedor = await Emprendedor.findOne({user: solicitud.user._id});

          return {
            id: solicitud._id.toString(),
            fechaAlta: solicitud.user.fechaAlta,
            fechaSolicitud: solicitud?.fecha ?? new Date(),
            comentarioEnviados: comentariosPropuestas?.length + comentariosPublicaciones?.length,
            apellido: emprendedor?.apellido ?? "",
            nombre: emprendedor?.nombre ?? "",
            dni: emprendedor?.dni ?? 0,
            fechaNacimiento: emprendedor?.fechaNacimiento ?? new Date,
            nacionalidad: emprendedor?.nacionalidad ?? "",
            email: solicitud.user.email,
          }
        }),
      )
    }

    return this.response
  }
}
