import express from 'express';
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'

import statusRouter from './routes/status.ts'
import authRouter from './routes/auth.ts'
import comboRouter from './routes/combo-manager.ts'
import publicacionesRouter from './routes/publicaciones.ts'
import homeRouter from './routes/home.ts'
import propuestasRouter from './routes/propuestas.ts'

const app = express();

app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

app.use('/api', statusRouter)
app.use('/api/auth', authRouter)
app.use('/api/combos', comboRouter)
app.use('/api/gestion-publicaciones', publicacionesRouter)
app.use('/api/home-publicaciones', homeRouter)
app.use('/api/propuestas', propuestasRouter)

export default app;