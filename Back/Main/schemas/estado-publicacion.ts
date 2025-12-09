import mongoose from 'mongoose'

const { Schema } = mongoose

const estadoPublicacionSchema = new Schema({
  name: { type: String, required: true, lowercase: true, trim: true, unique: true },
})

const EstadoPublicacion = mongoose.model('EstadoPublicacion', estadoPublicacionSchema)

export default EstadoPublicacion
