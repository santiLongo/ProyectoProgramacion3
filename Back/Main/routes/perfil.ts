import express from 'express';
import type { RequestWithBody, RequestWithQuery } from '../models/generic-request.ts';
import { GetPerfilEmpresaHandler } from '../handlers/perfil/get-empresa/get-perfil-handler.ts';
import { UpdateEmpresaHandler } from '../handlers/perfil/update-empresa/update-empresa-handler.ts';
import type { GetPerfilEmprendedorCommand } from '../handlers/perfil/get-user/models/get-perfil-emprendedor-command.ts';
import { GetPerfilEmprendedorHandler } from '../handlers/perfil/get-user/get-emprendedor-handler.ts';

const router = express.Router();

router.get('/get-empresa', async (req: RequestWithQuery<any>, res: any) => {
    const command = req.query;
    const handler = new GetPerfilEmpresaHandler();
    const response = await handler.handle(command);
    res.status(200).send(response);
});

router.post('/update-empresa', async (req: RequestWithBody<any>, res: any) => {
    const command = req.body;
    const IdUsuario = req.headers['user-id'] as string;
    const handler = new UpdateEmpresaHandler();
    await handler.handle(command, IdUsuario);
    res.status(200).send({ message: 'Perfil de empresa actualizado correctamente' });
});

router.get('/get-emprendedor', async (req: RequestWithQuery<GetPerfilEmprendedorCommand>, res: any) => {
    const command = req.query;
    const handler = new GetPerfilEmprendedorHandler();
    const response = await handler.handle(command);
    res.status(200).send(response);
});

router.post('/update-emprendedor', async (req: RequestWithBody<any>, res: any) => {
    const command = req.body;
    const IdUsuario = req.headers['user-id'] as string;
    const handler = new UpdateEmpresaHandler();
    await handler.handle(command, IdUsuario);
    res.status(200).send({ message: 'Perfil de empresa actualizado correctamente' });
});

router.post('/solicitud', async (req: RequestWithBody<any>, res: any) => {
    const command = req.body;
    const IdUsuario = req.headers['user-id'] as string;
    const handler = new UpdateEmpresaHandler();
    await handler.handle(command, IdUsuario);
    res.status(200).send({ message: 'Perfil de empresa actualizado correctamente' });
});

export default router
