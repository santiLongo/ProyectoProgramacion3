import Publicacion from '../../../schemas/publicacion.ts'
import Empresa from '../../../schemas/empresa.ts'
import type { RequestWithBody } from '../../../models/generic-request.ts'
import { ObjectId } from 'mongodb'
import Sector from '../../../schemas/sector.ts'
import { fixedObjectId } from '../../../utils/fixed-object-id.ts'

export class CreatePublicacionesHandler {
  public async handler(command: RequestWithBody<FormAltaModel>): Promise<void> {
    Validar(command.body)

    const userIdHeader = command.headers['user-id']

    if (!userIdHeader) {
      throw new Error('Falta el header user-id')
    }

    const userIdStr = Array.isArray(userIdHeader) ? userIdHeader[0] : userIdHeader
    const empresa = await Empresa.findOne({ user: userIdStr })

    if (!empresa) {
      throw new Error('No se encontró una empresa asociada al usuario')
    }

    const idSector = fixedObjectId(command.body.sector)
    const sector = await Sector.findOne({ _id: idSector })

    if (!sector) {
      throw new Error('No se encontró el sector')
    }

    const publicacion = await Publicacion.create({
      titulo: command.body.titulo,
      descripcion: command.body.descripcion,
      sector: sector?._id,
      tags: command.body.tags,
      empresa: empresa?._id,
      estado: 'activo',
      fechaAlta: new Date(),
    })
  }
}

const Validar = (command: FormAltaModel) => {
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

export interface FormAltaModel {
  id?: string
  titulo: string
  sector: number
  tags?: string
  descripcion: string
}
