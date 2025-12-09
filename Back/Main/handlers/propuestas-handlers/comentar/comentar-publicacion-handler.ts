import ComentarioPropuesta from "../../../schemas/comentario-propuesta.ts"
import Propuesta from "../../../schemas/propuesta.ts"
import type { ComentarPropuestaCommand } from "./models/comentar-propuesta-command.ts"


export class ComentarPropuestaHandler {
  public async handle(command: ComentarPropuestaCommand, idUsuario: string) {
    if (command.idPropuesta == undefined || command.idPropuesta == '') {
      throw new Error(
        'Hubo un problema con la solicitud para identificar la publicacion, comuniquese con soporte',
      )
    }

    if (command.comentario == undefined || command.comentario == '') {
      throw new Error(
        'El comentario no puede ser vacio',
      )
    }

    const propuesta = await Propuesta.findOne({ _id: command.idPropuesta }).populate('comentarios')

    if (!propuesta) {
      throw new Error('No se encontro la publicacion solicitada')
    }

    ComentarioPropuesta.create({
        propuesta: propuesta._id,
        texto: command.comentario,
        usuario: idUsuario,
        fecha: new Date
    })
  }
}
