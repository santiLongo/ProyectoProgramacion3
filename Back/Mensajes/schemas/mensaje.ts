import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'

const { Schema } = mongoose

const mensajeSchema = new Schema({
  canal: { type: ObjectId, ref: 'Canal', required: true},
  remitente: { type: ObjectId, ref: 'User', required: true},
  texto: { type: String, trim: true, required: true },
  fechaEnvio: { type: Date, required: true, default: Date.now },
})

const Mensaje = mongoose.model('Mensaje', mensajeSchema)

export default Mensaje