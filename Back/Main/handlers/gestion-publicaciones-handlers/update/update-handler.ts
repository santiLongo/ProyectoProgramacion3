import Publicacion from '../../../schemas/publicacion.ts'
import type { RequestWithBody } from '../../../models/generic-request.ts'
import Sector from '../../../schemas/sector.ts'
import { fixedObjectId } from '../../../utils/fixed-object-id.ts'
import type { FormAltaModel } from '../create/create-handler.ts'
import { ObjectId } from 'mongodb'

export class UpdatePublicacionesHandler {
  public async handler(command: RequestWithBody<FormAltaModel>): Promise<void> {
    Validar(command.body)

    const idSector = fixedObjectId(command.body.sector)
    const sector = await Sector.findOne({ _id: idSector })

    if (!sector) {
      throw new Error('No se encontró el sector')
    }

    const _id = new ObjectId(command.body.id)

    const publicacion = await Publicacion.findByIdAndUpdate(_id, {
      titulo: command.body.titulo,
      sector: sector._id,
      descripcion: command.body.descripcion,
      tags: command.body.tags,
    })
  }
}

const Validar = (command: FormAltaModel) => {
  if (!command.id?.trim()) {
    throw new Error('Necesita un id')
  }
  if (!command.titulo?.trim()) {
    throw new Error('Necesita un título')
  }
  if (!command.descripcion?.trim()) {
    throw new Error('Necesita una descripción')
  }
  if (command.sector == null) {
    throw new Error('Necesita un sector')
  }
  return
}
