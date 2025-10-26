import express from 'express';
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'

import statusRouter from './routes/status.ts'
import authRouter from './routes/auth.ts'
import comboRouter from './routes/combo-manager.ts'
import publicacionesRouter from './routes/publicaciones.ts'

const app = express();

app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/api', statusRouter)
app.use('/api/auth', authRouter)
app.use('/api/combos', comboRouter)
app.use('/api/publicaciones', publicacionesRouter)

export default app;