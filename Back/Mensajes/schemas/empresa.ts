import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'

const { Schema } = mongoose

const empresaSchema = new Schema({
  name: { type: String, required: true, trim: true},
  cuit: { type: String, required: true, lowercase: true, trim: true, unique: true },
  fechaFundacion: { type: Date, required: true, lowercase: true, trim: true},
  sector: { type: ObjectId, ref: 'Sector', required: true },
  user: { type: ObjectId, ref: 'User', required: true, unique: true }
})

const Empresa = mongoose.model('Empresa', empresaSchema)

export default Empresa