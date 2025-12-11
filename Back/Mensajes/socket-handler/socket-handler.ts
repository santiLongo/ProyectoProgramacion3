import { GetCanalesByIdHandler } from "../handlers/canal/get-canales-by-id-handler/get-canales-by-id-handler.ts"
import type { GetCanalesByIdCommand } from "../handlers/canal/get-canales-by-id-handler/models/get-canales-by-id-command.ts"
import { EnviarMensajesHandler } from "../handlers/mensajes/enviar-mensaje/enviar-mensajes-handler.ts"
import type { SendMessageCommand } from "../handlers/mensajes/enviar-mensaje/models/send-message-commnad.ts"
import { GetMensajesHandler } from "../handlers/mensajes/get-mensajes/get-mensajes-handler.ts"
import type { GetMensajesCommand } from "../handlers/mensajes/get-mensajes/models/get-mensajes-command.ts"

export const SocketHandler = (io: any) => {
  io.on('connection', (socket: any) => {
    console.log('a user connected')
    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
    socket.on('send-message', async (msg: SendMessageCommand) => {
      console.log('message: ' + msg)
      const handler = new EnviarMensajesHandler()
      const mensaje = await handler.handle(msg)
      io.to(msg.canalId).emit('recive-message', mensaje);
    })
    socket.on('join-channel', (channel: string) => {
      socket.join(channel)
      console.log(`User joined room: ${channel}`)
    })
    socket.on('leave-channel', (channel: string) => {
      socket.leave(channel)
      console.log(`User left room: ${channel}`)
    })
    socket.on('get-canals', async (command: GetCanalesByIdCommand, callback) => {
      const handler = new GetCanalesByIdHandler()
      const canals = await handler.handle(command)
      callback({
        ok: true,
        data: canals,
      });
    })
    socket.on('get-mensajes', async (command: GetMensajesCommand, callback) => {
      const handler = new GetMensajesHandler()
      const mensajes = await handler.handle(command)
      callback({
        ok: true,
        data: mensajes,
      });
    })
  })
}
