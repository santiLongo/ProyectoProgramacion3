import mongoose from 'mongoose'

const { Schema } = mongoose

const estadoPropuestaSchema = new Schema({
  name: { type: String, required: true, lowercase: true, trim: true, unique: true },
})

const EstadoPropuesta = mongoose.model('EstadoPropuesta', estadoPropuestaSchema)

export default EstadoPropuesta
