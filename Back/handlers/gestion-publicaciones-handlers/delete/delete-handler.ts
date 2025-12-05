import Publicacion from '../../../schemas/publicacion.ts'
import type { RequestWithBody } from '../../../models/generic-request.ts'
import { ObjectId } from 'mongodb'
import EstadoPublicacion from '../../../schemas/estado-publicacion.ts'
import mongoose from 'mongoose'

export class DeletePublicacionesHandler {
  public async handler(command: RequestWithBody<DeleteCommand>): Promise<void> {
    const idPublicacion = command.body.idPublicacion

    if (!idPublicacion || idPublicacion == '') {
      throw new Error('Se necesita de un id para esta accion')
    }

    const publicacion = await Publicacion.findById(idPublicacion);

    if (!publicacion) {
      throw new Error('No se encontró la publicación')
    }

    const suspension = await EstadoPublicacion.findOne({ name: /susp/i }).select('_id')

    if (!suspension) {
      throw new Error('No se encontró el estado suspendido')
    }
    
    publicacion.estado = suspension._id;

    publicacion.save();
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
