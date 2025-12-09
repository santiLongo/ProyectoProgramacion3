import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'

const { Schema } = mongoose

const emprendedorSchema = new Schema({
  nombre: { type: String, required: true, trim: true},
  apellido: { type: String, required: true, trim: true},
  dni: { type: Number, required: true, lowercase: true, trim: true, unique: true },
  fechaNacimiento: { type: Date, required: true, lowercase: true, trim: true},
  nacionalidad: { type: String, lowercase: true, trim: true, required: true },
  user: { type: ObjectId, ref: 'User', required: true, unique: true }
})

const Emprendedor = mongoose.model('Emprendedores', emprendedorSchema)

export default Emprendedor