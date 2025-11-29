import express from 'express'
import type { RequestWithBody } from '../../../models/generic-request.ts'
import Emprendedor from '../../../schemas/emprendedor.ts'
import { ObjectId } from 'mongodb'
import Propuesta from '../../../schemas/propuesta.ts'
import Publicacion from '../../../schemas/publicacion.ts'
import EstadoPropuesta from '../../../schemas/estado-prouesta.ts'

export class CreatePropuestaHandler {
  public async handler(command: RequestWithBody<FormPropuestaAltaModel>) {
    const propuestaCommand = command.body
    Validar(propuestaCommand)

    const userId = command.headers['user-id']

    if (!userId) {
      throw new Error('Ups parece que no tenemos su id, por favor comunicarse con soporte')
    }

    const userIdStr = Array.isArray(userId) ? userId[0] : userId

    const emprendedor = await Emprendedor.findOne({ user: userIdStr })

    if (!emprendedor) {
      throw new Error('Ups no pudimos encontrar su usuario.')
    }

    const publicacion = await Publicacion.findOne({
      _id: propuestaCommand.idPublicacion,
      estado: 'activo',
    })

    if (!publicacion) {
      throw new Error(
        'Ups no pudimos encontrar la publicacion de la empresa o la publicacion no esta activa.',
      )
    }

    const estadosSinPosibilidadDeNuevaPropuesta = await EstadoPropuesta.find({
      name: { $in: [/Aceptada/i, /Pendiente/i] },
    }).select('_id');

    const existePropuesta = await Propuesta.findOne({
      $and: [
        { emprendedor: emprendedor?._id },
        { publicacion: publicacion?._id },
        { estado: { $in: estadosSinPosibilidadDeNuevaPropuesta } },
      ],
    })

    if (existePropuesta) {
      throw new Error('Ya tiene enviada una propuesta para esa publicacion')
    }

    const propuesta = await Propuesta.create({
      titulo: propuestaCommand.titulo,
      descripcion: propuestaCommand.descripcion,
      presupuesto: propuestaCommand.presupuesto,
      publicacion: publicacion?._id,
      emprendedor: emprendedor?._id,
      estado: await EstadoPropuesta.findOne({ name: /Pendiente/i }).then((estado) => estado?._id),
      fecha: new Date(),
    })

    return propuesta
  }
}

const Validar = (form: FormPropuestaAltaModel) => {
  if (form.titulo == null || form.titulo == '' || form.titulo == undefined) {
    throw new Error('Falta cargar un titulo')
  }
  if (form.descripcion == null || form.descripcion == '' || form.descripcion == undefined) {
    throw new Error('Falta cargar una descripcion')
  }
  if (form.presupuesto == null || form.presupuesto == 0 || form.presupuesto == undefined) {
    throw new Error('Falta cargar el presupuesto')
  }
  if (form.idPublicacion == null || form.idPublicacion == '' || form.idPublicacion == undefined) {
    throw new Error('Falta el id de la publicacion')
  }
}

export interface FormPropuestaAltaModel {
  titulo: string
  descripcion: string
  presupuesto: number
  idPublicacion: string
}
