import Publicacion from '../../../schemas/publicacion.ts'
import type { RequestWithBody } from '../../../models/generic-request.ts'
import { ObjectId } from 'mongodb'

export class DeletePublicacionesHandler {
  public async handler(command: RequestWithBody<DeleteCommand>): Promise<void> {
    const idPublicacion = command.body.idPublicacion

    if (!idPublicacion || idPublicacion == '') {
      throw new Error('Se necesita de un id para esta accion')
    }
    const _id = new ObjectId(idPublicacion)

    const publicacion = await Publicacion.findByIdAndDelete({ _id: _id })
  }
}

interface GetAllCardsPublicaciones {
  id: string
  titulo: string
  descripcion: string
  sector: string
  tags: string
  empresaName: string
  empresaImg?: string
}

export interface DeleteCommand {
  idPublicacion: string
}
