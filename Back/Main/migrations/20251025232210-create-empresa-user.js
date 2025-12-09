import mongoose from 'mongoose'
const { ObjectId } = mongoose.Types

const empresaUser = [
  {
    _id: new ObjectId('000000000000000000000001'),
    email: 'empresa@prueba.com.ar',
    password: '$2a$10$J3Qa3YiZTxXBX7NsSXMWmeVfrnsK7GXyCQM8sQ0VpSgvULxA/DOgO', // Password1
    userName: 'EmpresaPrueba',
    role: new ObjectId('000000000000000000000002'), // Empresa
    estado: true,
    fechaAlta: new Date(),
  },
]

const empresa = [
  {
    _id: new ObjectId('000000000000000000000000'),
    name: 'EmpresaAdmin',
    cuit: '30-12345678-8',
    fechaFundacion: '1900-01-01T00:00:00',
    sector: new ObjectId('000000000000000000000003'),
    user: new ObjectId('000000000000000000000001')
  },
]

export const up = async (db) => {
  await db.collection('users').insertMany(empresaUser)
  await db.collection('empresas').insertMany(empresa)
}

export const down = async (db) => {
  await db.collection('users').deleteMany({
    _id: { $in: empresaUser.map((user) => user._id) }
  })
  await db.collection('empresas').deleteMany({
    _id: { $in: empresa.map((empresa) => empresa._id) }
  })
}
