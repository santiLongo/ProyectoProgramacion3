import express from 'express';
import type { RequestWithParams, RequestWithBody } from '../models/generic-request.ts';
import { GetAllPublicacionesHandler } from '../handlers/publicaciones-handlers/get-all/get-all-handler.ts';
import { CreatePublicacionesHandler, type FormAltaModel } from '../handlers/publicaciones-handlers/create/create-handler.ts';
import { DeletePublicacionesHandler, type DeleteCommand } from '../handlers/publicaciones-handlers/delete/delete-handler.ts';
import { UpdatePublicacionesHandler } from '../handlers/publicaciones-handlers/update/update-handler.ts';

const router = express.Router();

router.get('/getAll', async (req: RequestWithParams<any>, res: any) => {

    const getAllHandler = new GetAllPublicacionesHandler(req);
    
    const response = await getAllHandler.handler();

    if(response.errores){
        res.status(400).send(response.mensaje)
    }

    res.status(200).send(
        response.mensaje
    )
});

router.post('/create', async (req: RequestWithBody<FormAltaModel>, res: any) => {
    console.log(req.body);

    const handler = new CreatePublicacionesHandler();

    const response = await handler.handler(req);

    if(response.errores){
        res.status(500).send(
            response
        );
    }

    res.status(200).send(
        response
    );
})

router.post('/delete', async (req: RequestWithBody<DeleteCommand>, res: any) => {
    console.log(req.body);

    const handler = new DeletePublicacionesHandler();

    const response = await handler.handler(req);

    if(response.errores){
        res.status(500).send(
            response
        );
    }

    res.status(200).send(
        response
    );
})

router.post('/update', async (req: RequestWithBody<FormAltaModel>, res: any) => {
    console.log(req.body);

    const handler = new UpdatePublicacionesHandler();

    const response = await handler.handler(req);

    if(response.errores){
        res.status(500).send(
            response
        );
    }

    res.status(200).send(
        response
    );
})

export default router