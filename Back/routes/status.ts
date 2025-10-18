import express from 'express'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import mongoose from 'mongoose';

const router = express.Router();

router.get('/status', (req: void, res: any) => {
    res.status(200).send({ status:'Tamo Activo'});
    console.log('📦 Base de datos:', mongoose.connection.name);
});

export default router