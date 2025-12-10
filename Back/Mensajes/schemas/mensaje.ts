import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'

const { Schema } = mongoose

const canalSchema = new Schema({
  name: { type: String, required: true, trim: true},
  canal: { type: ObjectId, ref: 'Canal', required: true},
  remitente: { type: ObjectId, ref: 'User', required: true},
  texto: { type: String, trim: true, required: true },
  fechaEnvio: { type: Date, required: true, default: Date.now },
})

const Canal = mongoose.model('Canal', canalSchema)

export default Canal