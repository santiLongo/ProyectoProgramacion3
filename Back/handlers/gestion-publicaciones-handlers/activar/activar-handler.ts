import Publicacion from '../../../schemas/publicacion.ts'
import type { RequestWithBody } from '../../../models/generic-request.ts'
import EstadoPublicacion from '../../../schemas/estado-publicacion.ts'

export class ActivarPublicacionesHandler {
  public async handler(command: RequestWithBody<ActivarCommand>): Promise<void> {
    const idPublicacion = command.body.idPublicacion

    if (!idPublicacion || idPublicacion == '') {
      throw new Error('Se necesita de un id para esta accion')
    }

    const publicacion = await Publicacion.findById(idPublicacion);

    if (!publicacion) {
      throw new Error('No se encontró la publicación')
    }

    const activar = await EstadoPublicacion.findOne({ name: /act/i }).select('_id')

    if (!activar) {
      throw new Error('No se encontró el estado suspendido')
    }
    
    publicacion.estado = activar._id;

    publicacion.save();
  }
}

export interface ActivarCommand {
  idPublicacion: string
}
