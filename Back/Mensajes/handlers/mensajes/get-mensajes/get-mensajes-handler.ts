import Mensaje from "../../../schemas/mensaje.ts";
import type { GetMensajesCommand } from "./models/get-mensajes-command.ts";
import type { GetMensajesResponse } from "./models/get-mensajes-response.ts";

export class GetMensajesHandler {
  async handle(command: GetMensajesCommand): Promise<GetMensajesResponse[]> {
    if (!command.id || command.id.trim() === '') {
      throw new Error('Se necesita un ID de canal válido.');
    }

    const mensajes = await Mensaje.find({ canal: command.id }).populate<{remitente: {userName: string}}>('remitente');

    const response = mensajes.map<GetMensajesResponse>(mensaje => ({
      remitente: mensaje.remitente.userName.toString(),
      texto: mensaje.texto,
      fechaEnvio: mensaje.fechaEnvio,
    }));

    return response.toSorted((a, b) => a.fechaEnvio.getTime() - b.fechaEnvio.getTime());
  }
}
