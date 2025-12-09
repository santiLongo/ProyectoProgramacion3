import { ObjectId } from 'mongodb'
import mongoose, { Schema } from 'mongoose'

const comentarioPropuestaSchema = new Schema({
  propuesta: { type: ObjectId, ref: 'Propuestas', required: true },
  usuario: { type: ObjectId, ref: 'User', required: true },
  texto: { type: String, required: true },
  fecha: { type: Date, required: true },
})

const ComentarioPropuesta = mongoose.model('ComentarioPropuesta', comentarioPropuestaSchema)

export default ComentarioPropuesta
