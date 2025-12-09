import mongoose from 'mongoose'

const { Schema } = mongoose

const sectorSchema = new Schema({
  name: { type: String, required: true, lowercase: true, trim: true, unique: true },
})

const Sector = mongoose.model('Sector', sectorSchema)

export default Sector
