import ComentarioPublicacion from '../../../schemas/comentario-publicacion.ts'
import Publicacion from '../../../schemas/publicacion.ts'
import type { ComentarPublicacionCommand } from './models/comentar-publicacion-command.ts'

export class ComentarPublicacionHandler {
  public async handle(command: ComentarPublicacionCommand, idUsuario: string) {
    if (command.idPublicacion == undefined || command.idPublicacion == '') {
      throw new Error(
        'Hubo un problema con la solicitud para identificar la publicacion, comuniquese con soporte',
      )
    }

    if (command.comentario == undefined || command.comentario == '') {
      throw new Error(
        'El comentario no puede ser vacio',
      )
    }

    const publicacion = await Publicacion.findOne({ _id: command.idPublicacion }).populate('comentarios')

    if (!publicacion) {
      throw new Error('No se encontro la publicacion solicitada')
    }

    ComentarioPublicacion.create({
        publicacion: publicacion._id,
        texto: command.comentario,
        usuario: idUsuario,
        fecha: new Date
    })
  }
}
