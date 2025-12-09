import { ObjectId } from 'mongodb'
import mongoose, { Schema } from 'mongoose'

const comentarioPublicacionSchema = new Schema({
  publicacion: { type: ObjectId, ref: 'Publicaciones', required: true },
  usuario: { type: ObjectId, ref: 'User', required: true },
  texto: { type: String, required: true },
  fecha: { type: Date, required: true },
})

const ComentarioPublicacion = mongoose.model('ComentarioPublicacion', comentarioPublicacionSchema)

export default ComentarioPublicacion
