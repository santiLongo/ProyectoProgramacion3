import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'

const { Schema } = mongoose

const canalSchema = new Schema({
  name: { type: String, required: true, trim: true},
  user1: { type: ObjectId, ref: 'User', required: true},
  user2: { type: ObjectId, ref: 'User', required: true},
  propuesta: { type: ObjectId, ref: 'Propuestas', required: true },
  fechaAlta: { type: Date, required: true, default: Date.now },
})

canalSchema.index({ user1: 1, user2: 1, propuesta: 1 }, { unique: true });

const Canal = mongoose.model('Canal', canalSchema)

export default Canal