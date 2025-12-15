import express from 'express';
import type { RequestWithBody, RequestWithQuery } from '../models/generic-request.ts';
import { GetPerfilEmpresaHandler } from '../handlers/perfil/get-empresa/get-perfil-handler.ts';
import { UpdateEmpresaHandler } from '../handlers/perfil/update-empresa/update-empresa-handler.ts';
import type { GetPerfilEmprendedorCommand } from '../handlers/perfil/get-user/models/get-perfil-emprendedor-command.ts';
import { GetPerfilEmprendedorHandler } from '../handlers/perfil/get-user/get-emprendedor-handler.ts';
import { UpdateEmprendedorHandler } from '../handlers/perfil/update-emprendedor/update-emprendedor-handler.ts';
import type { UpdateEmprendedorCommand } from '../handlers/perfil/update-emprendedor/models/update-emprendedor-command.ts';
import type { UpdatePerfilEmpresaCommand } from '../handlers/perfil/update-empresa/models/update-perfil-empresa.command.ts';
import type { GetPerfilEmpresaCommand } from '../handlers/perfil/get-empresa/models/get-perfil-empresa-command.ts';
import { SolicitudHandler } from '../handlers/perfil/solicitud/solicitud-handler.ts';
import type { SolicitudEmprendedorCommand } from '../handlers/perfil/solicitud/models/solicitud-emprendedor-command.ts';

const router = express.Router();

router.get('/get-empresa', async (req: RequestWithQuery<GetPerfilEmpresaCommand>, res: any) => {
    const command = req.query;
    const handler = new GetPerfilEmpresaHandler();
    const response = await handler.handle(command);
    res.status(200).send(response);
});

router.post('/update-empresa', async (req: RequestWithBody<UpdatePerfilEmpresaCommand>, res: any) => {
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

router.post('/update-emprendedor', async (req: RequestWithBody<UpdateEmprendedorCommand>, res: any) => {
    const command = req.body;
    const IdUsuario = req.headers['user-id'] as string;
    const handler = new UpdateEmprendedorHandler();
    await handler.handle(command, IdUsuario);
    res.status(200).send({ message: 'Perfil del emprendedor actualizado correctamente' });
});

router.post('/solicitud', async (req: RequestWithBody<SolicitudEmprendedorCommand>, res: any) => {
    const command = req.body;
    const IdUsuario = req.headers['user-id'] as string;
    const handler = new SolicitudHandler();
    await handler.handle(command, IdUsuario);
    res.status(200).send({ message: 'Solicitud enviada correctamente' });
});

export default router
