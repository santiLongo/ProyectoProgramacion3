import express from 'express';
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'

import statusRouter from './routes/status.ts'
import authRouter from './routes/auth.ts'

const app = express();

app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/api', statusRouter)
app.use('/api/auth', authRouter)

export default app;