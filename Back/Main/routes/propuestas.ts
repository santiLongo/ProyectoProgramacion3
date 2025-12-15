import express, { response } from 'express'
import type { RequestWithBody, RequestWithParams, RequestWithQuery } from '../models/generic-request.ts'
import {
  CreatePropuestaHandler,
  type FormPropuestaAltaModel,
} from '../handlers/propuestas-handlers/create/create-propuesta-handler.ts'
import { GetAllPropuestasHandler, type GetAllPropuestasCommand } from '../handlers/propuestas-handlers/get-all/get-all-propuesta-handler.ts'
import { UpdateEstadoPropuestaHandler, type UpdateEstadoPropuestaCommand } from '../handlers/propuestas-handlers/update-estado/update-estado-handler.ts'
import { ComentarPropuestaHandler } from '../handlers/propuestas-handlers/comentar/comentar-publicacion-handler.ts'
import type { ComentarPropuestaCommand } from '../handlers/propuestas-handlers/comentar/models/comentar-propuesta-command.ts'
import { VotarPropuestaHandler } from '../handlers/propuestas-handlers/votar/votar-propuesta-handler.ts'
import type { VotarPropuestaCommand } from '../handlers/propuestas-handlers/votar/models/votar-propuesta-command.ts'
import type { UpdatePropuestaCommand } from '../handlers/propuestas-handlers/update/models/update-propuesta-command.ts'
import { UpdatePropuestaHandler } from '../handlers/propuestas-handlers/update/update-propuesta-handler.ts'

const router = express.Router()

router.post('/create', async (req: RequestWithBody<FormPropuestaAltaModel>, res: any, next) => {
  const handler = new CreatePropuestaHandler()

  const response = await handler.handler(req)

  res.status(200).send(response)
})

router.get('/getAll', async (req: RequestWithQuery<GetAllPropuestasCommand>, res: any, next) => {
  const handler = new GetAllPropuestasHandler()

  const response = await handler.handler(req.query)

  res.status(200).send(response)
})

router.post('/updateEstado', async (req: RequestWithBody<UpdateEstadoPropuestaCommand>, res: any, next) => {
  const command: UpdateEstadoPropuestaCommand = req.body;

  const handler = new UpdateEstadoPropuestaHandler();

  await handler.handler(command);
  res.status(201).send();

})

router.post('/update-propuesta', async (req: RequestWithBody<UpdatePropuestaCommand>, res: any, next) => {
  const command: UpdatePropuestaCommand = req.body;

  const handler = new UpdatePropuestaHandler();

  await handler.handle(command);
  res.status(201).send();

})

router.post('/comentar', async (req: RequestWithBody<ComentarPropuestaCommand>, res: any, next) => {
  const command: ComentarPropuestaCommand = req.body;

  const userIdHeader = req.headers['user-id']

    if (!userIdHeader) {
      throw new Error('Falta el header user-id')
    }

    const idUsuario = Array.isArray(userIdHeader) ? userIdHeader[0] : userIdHeader

  const handler = new ComentarPropuestaHandler();

  await handler.handle(command, idUsuario!);

  res.status(201).send();
})


router.post('/votar', async (req: RequestWithBody<VotarPropuestaCommand>, res: any, next) => {
  const command: VotarPropuestaCommand = req.body;

  const userIdHeader = req.headers['user-id']

    if (!userIdHeader) {
      throw new Error('Falta el header user-id')
    }

    const idUsuario = Array.isArray(userIdHeader) ? userIdHeader[0] : userIdHeader

  const handler = new VotarPropuestaHandler();

  await handler.handle(command, idUsuario!);

  res.status(201).send();
})

export default router
