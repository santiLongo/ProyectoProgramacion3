import mongoose, { type BooleanSchemaDefinition, type ObjectId } from 'mongoose'
import Publicacion from '../../../schemas/publicacion.ts'
import Empresa from '../../../schemas/empresa.ts'
import type { RequestWithParams } from '../../../models/generic-request.ts'
import express from 'express'

export class GetAllHomeHandler {
  private _commnad: RequestWithParams<any>

  constructor(commnad: RequestWithParams<any>) {
    this._commnad = commnad
  }

  public async handler(): Promise<GetAllCardsPublicaciones[]> {
    let response: GetAllCardsPublicaciones[] = []

    try {
      const publicaciones = await Publicacion.find()
      .populate<{ empresa: { name: string } }>('empresa')
      .populate<{ sector: { _id: ObjectId; name: string } }>('sector')
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
    } catch (error) {
      console.log(error)
    }

    if (response.length == 0) {
      express.response.status(400).send("No se encontraron publicaciones");
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
