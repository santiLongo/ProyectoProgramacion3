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

    res.status(200).send(
        response
    )
});

router.post('/create', async (req: RequestWithBody<FormAltaModel>, res: any) => {
    console.log(req.body);

    const handler = new CreatePublicacionesHandler();

    await handler.handler(req);

    res.status(200).send(
        "Cargado con exito"
    );
})

router.post('/delete', async (req: RequestWithBody<DeleteCommand>, res: any) => {
    console.log(req.body);

    const handler = new DeletePublicacionesHandler();

    await handler.handler(req);

    res.status(200).send(
        "Borrado con exito"
    );
})

router.post('/update', async (req: RequestWithBody<FormAltaModel>, res: any) => {
    console.log(req.body);

    const handler = new UpdatePublicacionesHandler();

    await handler.handler(req);

    res.status(200).send(
        "Actualizado con exito"
    );
})

export default router