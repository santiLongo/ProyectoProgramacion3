import mongoose from 'mongoose'
const { ObjectId } = mongoose.Types

const initialEstadosPublicacion = [
  { _id: new ObjectId('000000000000000000000000'), name: 'Activa' },
  { _id: new ObjectId('000000000000000000000001'), name: 'Suspendida' },
  { _id: new ObjectId('000000000000000000000002'), name: 'Finalizada' },
];

export const up = async (db) => {
  await db.collection('estadopublicacions').insertMany(initialEstadosPublicacion)
}

export const down = async (db) => {
  await db.collection('estadopublicacions').deleteMany({
    _id: { $in: initialEstadosPublicacion.map((estado) => estado._id) }
  })
}
