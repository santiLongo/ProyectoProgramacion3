import mongoose, { type BooleanSchemaDefinition, type ObjectId } from 'mongoose'
import Publicacion from '../../../schemas/publicacion.ts'
import Empresa from '../../../schemas/empresa.ts'
import type { RequestWithParams } from '../../../models/generic-request.ts'
import express from 'express'
import EstadoPropuesta from '../../../schemas/estado-prouesta.ts'
import EstadoPublicacion from '../../../schemas/estado-publicacion.ts'

export class GetAllHomeHandler {
  private _commnad: RequestWithParams<any>

  constructor(commnad: RequestWithParams<any>) {
    this._commnad = commnad
  }

  public async handler(): Promise<GetAllCardsPublicaciones[]> {
    let response: GetAllCardsPublicaciones[] = []

    const activa = await EstadoPublicacion.findOne({ name: /Act/i }).select('_id')

    if (!activa) {
      throw new Error('No se encontró el estado activo')
    }

    const publicaciones = await Publicacion.find({ estado: activa._id })
      .populate<{ empresa: { name: string } }>('empresa')
      .populate<{ sector: { _id: ObjectId; name: string } }>('sector')
      .populate<{ estado: { _id: ObjectId; name: string } }>('estado')
      .exec();

      publicaciones.forEach((publicacion) => {
        const id = publicacion?._id
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

    if (response.length == 0) {
      throw new Error("No se encontraron publicaciones");
    }

    return response
  }
}

interface GetAllCardsPublicaciones {
  id: string
  titulo: string
  descripcion: string
  idSector: string
  sector: string
  tags: string
  empresaName: string
  empresaImg?: string
}
