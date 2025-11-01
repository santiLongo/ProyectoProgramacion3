import Publicacion from '../../../schemas/publicacion.ts'
import type { RequestWithBody } from '../../../models/generic-request.ts'
import Sector from '../../../schemas/sector.ts'
import { fixedObjectId } from '../../../utils/fixed-object-id.ts'
import type { FormAltaModel } from '../create/create-handler.ts'
import { ObjectId } from 'mongodb'

export class UpdatePublicacionesHandler {
  public async handler(
    command: RequestWithBody<FormAltaModel>,
  ): Promise<{ errores: boolean; mensaje: string | any }> {
    const esValido = Validar(command.body)

    if (esValido.errores) {
      return esValido
    }

    try {
      const idSector = fixedObjectId(command.body.sector)
      const sector = await Sector.findOne({ _id: idSector })

      if (!sector) {
        return { errores: true, mensaje: 'No se encontró el sector' }
      }

      const _id = new ObjectId(command.body.id);

      const publicacion = await Publicacion.findByIdAndUpdate(_id,
        {
            titulo: command.body.titulo,
            sector: sector._id,
            descripcion: command.body.descripcion,
            tags: command.body.tags
        }
      )

      return { errores: false, mensaje: publicacion }
    } catch (error) {
      return { errores: true, mensaje: error }
    }
  }
}

const Validar = (command: FormAltaModel): { errores: boolean; mensaje: string } => {
  if (!command.id?.trim()) {
    return { errores: true, mensaje: 'Necesita un id' }
  }
  if (!command.titulo?.trim()) {
    return { errores: true, mensaje: 'Necesita un título' }
  }
  if (!command.descripcion?.trim()) {
    return { errores: true, mensaje: 'Necesita una descripción' }
  }
  if (command.sector == null) {
    return { errores: true, mensaje: 'Necesita un sector' }
  }
  return { errores: false, mensaje: '' }
}
