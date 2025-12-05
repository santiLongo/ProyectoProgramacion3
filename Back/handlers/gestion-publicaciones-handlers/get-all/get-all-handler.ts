import mongoose, { type BooleanSchemaDefinition, type ObjectId } from 'mongoose'
import Publicacion from '../../../schemas/publicacion.ts'
import Empresa from '../../../schemas/empresa.ts'
import type { RequestWithParams } from '../../../models/generic-request.ts'
import express from 'express'

export class GetAllPublicacionesHandler {
  private _commnad: RequestWithParams<any>

  constructor(commnad: RequestWithParams<any>) {
    this._commnad = commnad
  }

  public async handler(): Promise<GetAllCardsPublicaciones[]> {
    let response: GetAllCardsPublicaciones[] = []

    const userIdHeader = this._commnad.headers['user-id']

      if (!userIdHeader) {
        throw new Error('Falta el header user-id')
      }

      const userIdStr = Array.isArray(userIdHeader) ? userIdHeader[0] : userIdHeader

      const empresa = await Empresa.findOne({ user: userIdStr })

      if (!empresa) {
        throw new Error('No se encontró una empresa asociada al usuario')
      }

      const publicaciones = await Publicacion.find({ empresa: empresa?._id })
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
          estado: publicacion.estado?.name
        }

        response.push(data)
      })

    if (response.length == 0) {
      throw new Error('No se encontraron publicaciones')
    }

    return response
  }

  private async buscoTodas() {
    return await Publicacion.find()
      .populate<{ empresa: { name: string } }>('empresa')
      .populate<{ sector: { _id: ObjectId; name: string } }>('sector')
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
  estado: string
}
