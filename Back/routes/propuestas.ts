import express, { response } from 'express';
import type { RequestWithBody, RequestWithParams } from '../models/generic-request.ts';
import { CreatePropuestaHandler, type FormPropuestaAltaModel } from '../handlers/propuestas-handlers/create/create-propuesta-handler.ts';

const router = express.Router();

router.post('/create', async (req: RequestWithBody<FormPropuestaAltaModel>, res: any) => {

    const handler = new CreatePropuestaHandler();

    const response = handler.handler(req)

    res.status(200).send(
        response
    )
});

export default router