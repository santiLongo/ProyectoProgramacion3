import express from 'express';
import type { RequestWithBody, RequestWithQuery } from '../models/generic-request.ts';
import { GetAllSolicitudesHandler } from '../handlers/solicitudes/get-all/get-all-solicitudes-handler.ts';
import type { RespuestaSolcitudCommand } from '../handlers/solicitudes/respuesta-solicitud/models/respuesta-solicitud-command.ts';
import { RespuestaSolcitudHandler } from '../handlers/solicitudes/respuesta-solicitud/respuesta-solictud-handler.ts';

const router = express.Router();

router.get('/getAll', async (req: RequestWithQuery<void>, res) => {
    const handler = new GetAllSolicitudesHandler();
    const response = await handler.handle();
    res.status(200).send(response);
})

router.post('/repuesta', async (req: RequestWithBody<RespuestaSolcitudCommand>, res) => {
    const command = req.body;
    const IdUsuario = req.headers['user-id'] as string;
    const handler = new RespuestaSolcitudHandler();
    await handler.handle(command, IdUsuario);
    res.status(200).send('Se respondio a la solicitud');
})

export default router