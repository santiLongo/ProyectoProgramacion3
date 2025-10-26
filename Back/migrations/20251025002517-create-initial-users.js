import mongodb from 'mongodb'

const { ObjectId } = mongodb

const initialUsers = [
  {
    _id: new ObjectId('000000000000000000000000'),
    email: 'admin@baseapi.com',
    password: '$2a$10$J3Qa3YiZTxXBX7NsSXMWmeVfrnsK7GXyCQM8sQ0VpSgvULxA/DOgO', // Password1
    userName: 'Admin',
    role: new ObjectId('000000000000000000000000'), // Admin
    estado: true,
    fechaAlta: new Date(),
  },
]

export const up = async (db) => {
  console.log("Insertando usuarios iniciales...");
  await db.collection('users').insertMany(initialUsers)
}

export const down = async (db) => {
  await db.collection('users').deleteMany({ _id: { $in: initialUsers.map((user) => user._id) } })
}
