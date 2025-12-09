import mongoose from 'mongoose'
const { ObjectId } = mongoose.Types

const initialEstadosPropuestas = [
  { _id: new ObjectId('000000000000000000000000'), name: 'Aceptada' },
  { _id: new ObjectId('000000000000000000000001'), name: 'Pendiente' },
  { _id: new ObjectId('000000000000000000000002'), name: 'Rechazada' },
];

export const up = async (db) => {
  await db.collection('estadoPropuestas').insertMany(initialEstadosPropuestas)
}

export const down = async (db) => {
  await db.collection('estadoPropuestas').deleteMany({
    _id: { $in: initialEstadosPropuestas.map((estado) => estado._id) }
  })
}
