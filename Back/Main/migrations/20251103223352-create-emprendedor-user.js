import mongoose from 'mongoose'
const { ObjectId } = mongoose.Types

const emprendedorUser = [
  {
    _id: new ObjectId('000000000000000000000002'),
    email: 'emprendedor@prueba.com.ar',
    password: '$2a$10$J3Qa3YiZTxXBX7NsSXMWmeVfrnsK7GXyCQM8sQ0VpSgvULxA/DOgO', // Password1
    userName: 'EmprendedorPrueba',
    role: new ObjectId('000000000000000000000001'), // Emprendedor
    estado: true,
    fechaAlta: new Date(),
  },
]

const emprendedor = [
  {
    _id: new ObjectId('000000000000000000000000'),
    nombre: 'Emprendedor',
    apellido: 'Prueba',
    dni: '45746638',
    fechaNacimiento: '2025-03-25T00:00:00',
    nacionalidad: 'Argentina',
    user: new ObjectId('000000000000000000000002')
  },
]

export const up = async (db) => {
  await db.collection('users').insertMany(emprendedorUser)
  await db.collection('emprendedores').insertMany(emprendedor)
}

export const down = async (db) => {
  await db.collection('users').deleteMany({
    _id: { $in: emprendedorUser.map((user) => user._id) }
  })
  await db.collection('emprendedores').deleteMany({
    _id: { $in: emprendedor.map((emprendedor) => emprendedor._id) }
  })
}
