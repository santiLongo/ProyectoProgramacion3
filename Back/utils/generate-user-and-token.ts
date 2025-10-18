import jwt from 'jsonwebtoken'
import User from '../schemas/user.ts'
import type { IUserSchema, IUserLogin } from '../schemas/user.ts'
// import fs from 'fs'
// import path from 'path'

import Role from '../schemas/role.ts'

async function generateUserToken(req: IUserLogin, user: any) {
  const role = await Role.findById(user.role).exec()

  const payload = {
    _id: user._id,
    role: role?.name,
  }

  const userResponse = {
    _id: user._id,
    role: role?.name,
    email: user.email,
    userName: user.userName,
    fechaAlta: user.fechaAlta,
  }

  // const privateKey = fs.readFileSync(path.join(__dirname, `../keys/base-api-express-generator.pem`))

  // Unsecure alternative
  const token = jwt.sign(payload, 'api-prog-3', {
    subject: user._id.toString(),
    issuer: 'api-prog-3',
  })

  // const token = jwt.sign(payload, privateKey, {
  //   subject: user._id.toString(),
  //   issuer: 'base-api-express-generator',
  //   algorithm: 'RS256',
  // })

  return { token, user: userResponse }
}

export default generateUserToken
