import express, { response } from 'express'
import type { RequestWithBody, RequestWithParams, RequestWithQuery } from '../models/generic-request.ts'
import {
  CreatePropuestaHandler,
  type FormPropuestaAltaModel,
} from '../handlers/propuestas-handlers/create/create-propuesta-handler.ts'
import { GetAllPropuestasHandler, type GetAllPropuestasCommand } from '../handlers/propuestas-handlers/get-all/get-all-propuesta-handler.ts'
import { UpdateEstadoPropuestaHandler, type UpdateEstadoPropuestaCommand } from '../handlers/propuestas-handlers/update-estado/update-estado-handler.ts'

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
  res.status(201);

})

export default router
