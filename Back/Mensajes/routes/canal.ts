import express from 'express'
import type { RequestWithBody, RequestWithQuery } from '../models/generic-request.ts'
import type { CreateCanalCommand } from '../handlers/canal/create-canal-handler/models/create-canal-command.ts'
import { CreateCanalHandler } from '../handlers/canal/create-canal-handler/create-canal-handler.ts'

const router = express.Router()

router.get('/get', (req: RequestWithQuery<any>, res) => {

})

router.post('/create', async (req: RequestWithBody<CreateCanalCommand>, res) => {
    const command = req.body;
    const handler = new CreateCanalHandler();
    await handler.handle(command);
    res.status(201).send();
})

export default router