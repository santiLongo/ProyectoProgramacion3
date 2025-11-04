import express from 'express'
import type { RequestWithBody } from '../../../models/generic-request.ts'
import Emprendedor from '../../../schemas/emprendedor.ts'
import { ObjectId } from 'mongodb'
import Propuesta from '../../../schemas/propuesta.ts'
import Publicacion from '../../../schemas/publicacion.ts'

export class CreatePropuestaHandler {
  public async handler(command: RequestWithBody<FormPropuestaAltaModel>) {
    const propuestaCommand = command.body
    Validar(propuestaCommand)

    const userId = command.headers['user-id']

    if (!userId) {
      express.response
        .status(500)
        .send('Ups parece que no tenemos su id, por favor comunicarse con soporte')
    }

    const userIdStr = Array.isArray(userId) ? userId[0] : userId

    try {
      const emprendedor = await Emprendedor.findOne({ user: userIdStr })

      if (!emprendedor) {
        express.response.status(500).send('Ups no pudimos encontrar su usuario.')
      }

      const publicacion = await Publicacion.findOne({
        _id: propuestaCommand.idPublicacion,
        estado: 'activo',
      })

      if (!publicacion) {
        express.response
          .status(500)
          .send(
            'Ups no pudimos encontrar la publicacion de la empresa o la publicacion no esta activa.',
          )
      }

      const existePropuesta = await Propuesta.findOne({
        $and: [
          {emprendedor: emprendedor?._id},
          {publicacion: publicacion?._id,},
          {$or: [
            {estado: 'pendiente'}, 
            {estado: 'activo'},
          ]}
        ],
      })

      if(existePropuesta){
        express.response
          .status(500)
          .send(
            'Ya tiene enviada una propuesta para esa publicacion',
          )
      }

      const propuesta = await Propuesta.create({
        titulo: propuestaCommand.titulo,
        descripcion: propuestaCommand.descripcion,
        presupuesto: propuestaCommand.presupuesto,
        publicacion: publicacion?._id,
        emprendedor: emprendedor?._id,
        estado: 'pendiente',
        fecha: new Date(),
      })

      return propuesta
    } catch (error) {
      express.response.status(500).send('Ocurrio un error al cargar la propuesta: ' + error)
    }
  }
}

const Validar = (form: FormPropuestaAltaModel) => {
  if (form.titulo == null || form.titulo == '' || form.titulo == undefined) {
    express.response.status(500).send('Falta cargar un titulo')
  }
  if (form.descripcion == null || form.descripcion == '' || form.descripcion == undefined) {
    express.response.status(500).send('Falta cargar una descripcion')
  }
  if (form.presupuesto == null || form.presupuesto == 0 || form.presupuesto == undefined) {
    express.response.status(500).send('Falta cargar el presupuesto')
  }
  if (form.idPublicacion == null || form.idPublicacion == '' || form.idPublicacion == undefined) {
    express.response.status(500).send('Falta el id de la publicacion')
  }
}

export interface FormPropuestaAltaModel {
  titulo: string
  descripcion: string
  presupuesto: number
  idPublicacion: string
}
