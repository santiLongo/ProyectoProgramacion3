import mongoose from 'mongoose'
const { ObjectId } = mongoose.Types

const roleNormalUser = [
  { _id: new ObjectId('000000000000000000000004'), name: 'normalUser', createdAt: new Date, updatedAt: new Date },
];

export const up = async (db) => {
  await db.collection('roles').insertMany(roleNormalUser)
}

export const down = async (db) => {
  await db.collection('roles').deleteMany({
    _id: { $in: roleNormalUser.map((role) => role._id) }
  })
}
