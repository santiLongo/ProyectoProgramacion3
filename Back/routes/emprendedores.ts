import express from "express";
import type { RequestWithQuery } from "../models/generic-request.ts";
import { GetEmprendedorHandler, type GetEmprendedorCommand } from "../handlers/emprendedores-handler/get/get-handler.ts";

const router = express.Router();

router.get("/get", async (req: RequestWithQuery<GetEmprendedorCommand>, res) => {
    const handler = new GetEmprendedorHandler();
    const response = await handler.handler(req.query);
    res.status(200).send(response);
});

export default router;