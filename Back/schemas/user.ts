import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const Schema = mongoose.Schema
const { ObjectId } = Schema.Types

// Email validation using regex (more secure than mongoose-validator)
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const emailValidator = {
  validator: function (v: string) {
    return emailRegex.test(v)
  },
  message: 'Please provide a valid email address',
}

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: emailValidator,
  },
  password: { type: String, required: true, select: false },
  role: { type: ObjectId, ref: 'Role', required: true },
  userName: { type: String, required: true, lowercase: true, trim: true },
  fechaAlta: { type: Date, required: true, lowercase: true, trim: true, value: Date.now },
  estado: { type: Boolean, default: true },
})

userSchema.methods.checkPassword = async function (potentialPassword: string) {
  if (!potentialPassword) {
    return Promise.reject(new Error('Password is required'))
  }

  const isMatch = await bcrypt.compare(potentialPassword, this.password)

  return { isOk: isMatch, isLocked: !this.estado }
}

const User = mongoose.model('User', userSchema)

export default User

export interface IUserSchema {
  _id: number
  email: string
  password: string
  role: number
  userName: string
  fechaAlta: Date
  estado: boolean
}

export interface IUserLoginReq {
  body: {
    email: string
    password: string
  }
}

export interface IUserLogin {
  email: string
  password: string
}
