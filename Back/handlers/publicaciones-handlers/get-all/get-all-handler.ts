import mongoose, { type ObjectId } from 'mongoose'
import Publicacion from '../../../schemas/publicacion.ts'
import Empresa from '../../../schemas/empresa.ts'
import type { RequestWithParams } from '../../../models/generic-request.ts'

export class GetAllPublicacionesHandler {
  public async handler(
    command: RequestWithParams<void>,
  ): Promise<{ errores: boolean; mensaje: string | any }> {
    let response: GetAllCardsPublicaciones[] = []

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

      const publicaciones = await Publicacion.find({ empresa: empresa?._id })
        .populate<{ empresa: { name: string } }>('empresa')
        .populate<{ sector: { _id: ObjectId, name: string } }>('sector')

      publicaciones.forEach((publicacion) => {
        const id = publicacion?._id;
        const data: GetAllCardsPublicaciones = {
          id: id.toString(),
          titulo: publicacion.titulo,
          descripcion: publicacion.descripcion,
          empresaName: publicacion.empresa?.name,
          idSector: publicacion.sector?._id.toString(),
          sector: publicacion.sector?.name,
          tags: publicacion.tags,
        }

        response.push(data)
      })
    } catch (error) {
      console.log(error)
    }

    if (response.length == 0) {
      return { errores: true, mensaje: "No se encontraron publicaciones" }
    }

    return { errores: false, mensaje: response }
  }
}

interface GetAllCardsPublicaciones {
  id: string
  titulo: string
  descripcion: string
  idSector:string;
  sector: string
  tags: string
  empresaName: string
  empresaImg?: string
}
