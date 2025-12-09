import express from 'express';
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors';
import { errorHandler } from './middlewares/manejo-errores.ts';
import './schemas/index.ts'

import authentication from './middlewares/authentication.ts';

const app = express();

app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

// app.use('/api', statusRouter);

app.use(errorHandler);

export default app;