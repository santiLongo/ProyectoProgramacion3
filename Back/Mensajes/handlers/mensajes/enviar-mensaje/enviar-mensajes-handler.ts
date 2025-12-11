import Canal from '../../../schemas/canal.ts'
import Mensaje from '../../../schemas/mensaje.ts'
import User from '../../../schemas/user.ts'
import type { GetMensajesResponse } from '../get-mensajes/models/get-mensajes-response.ts'
import type { SendMessageCommand } from './models/send-message-commnad.ts'

export class EnviarMensajesHandler {
  public async handle(command: SendMessageCommand): Promise<GetMensajesResponse> {
    ValidarCommand(command)

    const canal = await Canal.findById(command.canalId)

    if (!canal) {
      throw new Error('Canal no encontrado.')
    }

    await Mensaje.create({
      canal: canal._id,
      remitente: command.remitenteId,
      texto: command.mensaje,
      fechaEnvio: command.fecha,
    })

    return {
      remitente: await User.findById(command.remitenteId).then(user => user ? user.userName : 'Desconocido'),
      texto: command.mensaje,
      fechaEnvio: command.fecha,
    }
  }
}

function ValidarCommand(command: SendMessageCommand) {
  if (!command.canalId || command.canalId.trim() === '') {
    throw new Error('Se necesita un ID de canal válido.')
  }
  if (!command.remitenteId || command.remitenteId.trim() === '') {
    throw new Error('Se necesita un ID de remitente válido.')
  }
  if (!command.mensaje || command.mensaje.trim() === '') {
    throw new Error('El mensaje no puede estar vacío.')
  }
}
