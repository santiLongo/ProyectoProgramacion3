import express, { response } from 'express'
import type { RequestWithBody, RequestWithParams, RequestWithQuery } from '../models/generic-request.ts'
import {
  CreatePropuestaHandler,
  type FormPropuestaAltaModel,
} from '../handlers/propuestas-handlers/create/create-propuesta-handler.ts'
import { GetAllPropuestasHandler, type GetAllPropuestasCommand } from '../handlers/propuestas-handlers/get-all/get-all-propuesta-handler.ts'

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

export default router
