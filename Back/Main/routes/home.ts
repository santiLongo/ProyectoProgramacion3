import express from 'express';
import type { RequestWithParams } from '../models/generic-request.ts';
import { GetAllHomeHandler } from '../handlers/home-handlers/get-all/get-all-handler.ts';

const router = express.Router();

router.get('/getAll', async (req: RequestWithParams<any>, res: any) => {

    const getAllHandler = new GetAllHomeHandler(req);
    
    const response = await getAllHandler.handler();

    res.status(200).send(
        response
    )
});

export default router