import mongoose from 'mongoose'
const { ObjectId } = mongoose.Types

const initialSectors = [
  { _id: new ObjectId('000000000000000000000000'), name: 'Agricola' },
  { _id: new ObjectId('000000000000000000000001'), name: 'Tecnologico' },
  { _id: new ObjectId('000000000000000000000002'), name: 'Metalurgico' },
  { _id: new ObjectId('000000000000000000000003'), name: 'Financiero' },
  { _id: new ObjectId('000000000000000000000004'), name: 'Salud' },
  { _id: new ObjectId('000000000000000000000005'), name: 'Educativo' },
  { _id: new ObjectId('000000000000000000000006'), name: 'Turismo' },
  { _id: new ObjectId('000000000000000000000007'), name: 'Construcción' },
  { _id: new ObjectId('000000000000000000000008'), name: 'Logística' },
  { _id: new ObjectId('000000000000000000000009'), name: 'Energía' },
]

export const up = async (db) => {
  await db.collection('sectors').insertMany(initialSectors)
}

export const down = async (db) => {
  await db.collection('sectors').deleteMany({
    _id: { $in: initialSectors.map((sector) => sector._id) }
  })
}
