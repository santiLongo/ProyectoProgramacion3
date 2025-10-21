import  express  from 'express'
import User from '../schemas/user.ts'
import type { IUserLogin } from '../schemas/user.ts'
import generateUserToken from '../utils/generate-user-and-token.ts'

const router = express.Router()

router.post('/', createUserToken)

async function createUserToken(req: { body: IUserLogin }, res: any, next: any) {
  console.log(`Creating user token for ${req.body.email}`)

  if (!req.body.email) {
    console.error('Missing email parameter. Sending 400 to client')
    return res.status(400).end()
  }

  if (!req.body.password) {
    console.error('Missing password parameter. Sending 400 to client')
    return res.status(400).end()
  }

  try {
    const user = await User.findOne({ email: req.body.email }, '+password')

    if (!user) {
      console.error('User not found. Sending 404 to client')
      return res.status(401).end()
    }

    console.log('Checking user password')
    const result = await user.checkPassword(req.body.password);

    if (result.isLocked) {
      console.error('User is locked. Sending 400 (Locked) to client')
      return res.status(400).end()
    }

    if (!result.isOk) {
      console.error('User password is invalid. Sending 401 to client')
      return res.status(401).end()
    }

    const userLogin: IUserLogin = {
        email: req.body.email,
        password: req.body.password
    }

    const response = await generateUserToken(userLogin, user)

    res.status(201).json(response)
  } catch (err) {
    next(err)
  }
}

export default router
