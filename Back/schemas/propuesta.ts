import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'

const { Schema } = mongoose

const propuestaSchema = new Schema({
  titulo: { type: String, required: true, trim: true},
  descripcion: { type: String, required: true, trim: true},
  presupuesto: { type: Number, required: true, trim: true},
  estado: { type: String, required: true, lowercase: true, trim: true},
  fecha: { type: Date, required: true, lowercase: true, trim: true},
  emprendedor: { type: ObjectId, ref: 'Emprendedores', required: true, unique: true },
  publicacion: { type: ObjectId, ref: 'Publicaciones', required: true, unique: true }
})

const Propuesta = mongoose.model('Propuestas', propuestaSchema)

export default Propuesta