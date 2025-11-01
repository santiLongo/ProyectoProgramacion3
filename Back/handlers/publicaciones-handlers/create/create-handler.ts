import Publicacion from '../../../schemas/publicacion.ts'
import Empresa from '../../../schemas/empresa.ts'
import type { RequestWithBody } from '../../../models/generic-request.ts'
import { ObjectId } from 'mongodb'
import Sector from '../../../schemas/sector.ts'
import { fixedObjectId } from '../../../utils/fixed-object-id.ts'

export class CreatePublicacionesHandler {
  public async handler(
    command: RequestWithBody<FormAltaModel>,
  ): Promise<{ errores: boolean; mensaje: string | any }> {
    const esValido = Validar(command.body)

    if (esValido.errores) {
      return esValido
    }

    try {
      const userIdHeader = command.headers['user-id']

      if (!userIdHeader) {
        return { errores: true, mensaje: 'Falta el header user-id' }
      }

      const userIdStr = Array.isArray(userIdHeader) ? userIdHeader[0] : userIdHeader
      const empresa = await Empresa.findOne({ user: userIdStr })

      if (!empresa) {
        return { errores: true, mensaje: 'No se encontró una empresa asociada al usuario' }
      }

      const idSector = fixedObjectId(command.body.sector)
      const sector = await Sector.findOne({ _id: idSector })

      if (!sector) {
        return { errores: true, mensaje: 'No se encontró el sector' }
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

      return { errores: false, mensaje: publicacion }
    } catch (error) {
      return { errores: true, mensaje: error }
    }
  }
}

const Validar = (command: FormAltaModel): { errores: boolean; mensaje: string } => {
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

export interface FormAltaModel {
  id?: string
  titulo: string
  sector: number
  tags?: string
  descripcion: string
}
