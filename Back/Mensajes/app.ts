import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'
import { errorHandler } from './middlewares/manejo-errores.ts'
import './schemas/index.ts'
import authentication from './middlewares/authentication.ts'

import canalRouter from './routes/canal.ts'

const app = express()

app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(authentication)

app.use('/api/canal', canalRouter)

app.use(errorHandler)

export default app