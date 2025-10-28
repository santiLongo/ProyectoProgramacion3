import express from 'express';
import type { RequestWithParams, RequestWithBody } from '../models/generic-request.ts';
import { GetAllPublicacionesHandler } from '../handlers/publicaciones-handlers/get-all/get-all-handler.ts';

const router = express.Router();

const getAllHandler = new GetAllPublicacionesHandler;

router.get('/getAll', async (req: RequestWithParams<GetAllCommand>, res: any) => {
    const idEmpresa: number = req.params.idEmpresa
    
    const response = await getAllHandler.handler(idEmpresa);

    if(response.length == 0){
        res.status(400).send("No se encontraron publicaciones")
        return;
    }

    res.status(200).send({
        response
    })
    return;
});

export default router

interface GetAllCommand {
    idEmpresa: number
}