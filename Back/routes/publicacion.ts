import express from 'express';
import type { RequestWithBody, RequestWithQuery } from '../models/generic-request.ts';
import type { GetPublicacionCommand } from '../handlers/publicacion-handler/get/models/get-publicacion-command.ts';
import { GetPublicacionHandler } from '../handlers/publicacion-handler/get/get-publicacion-handler.ts';
import type { ComentarPublicacionCommand } from '../handlers/publicacion-handler/comentar/models/comentar-publicacion-command.ts';
import { ComentarPublicacionHandler } from '../handlers/publicacion-handler/comentar/comentar-publicacion-handler.ts';

const router = express.Router();

router.get('/get-publi', async (req: RequestWithQuery<GetPublicacionCommand>, res: any) => {
    const command = req.query;

    const userIdHeader = req.headers['user-id']

    if (!userIdHeader) {
      throw new Error('Falta el header user-id')
    }

    const idUsuario = Array.isArray(userIdHeader) ? userIdHeader[0] : userIdHeader

    const handler = new GetPublicacionHandler();

    const response = await handler.handle(command, idUsuario!);

    res.status(200).send(response);
})

router.post('/comentar', async (req: RequestWithBody<ComentarPublicacionCommand>, res: any) => {
    const command = req.body;

    const userIdHeader = req.headers['user-id']

    if (!userIdHeader) {
      throw new Error('Falta el header user-id')
    }

    const idUsuario = Array.isArray(userIdHeader) ? userIdHeader[0] : userIdHeader

    const handler = new ComentarPublicacionHandler();

    const response = await handler.handle(command, idUsuario!);

    res.status(200).send(response);
})

export default router