import { GetCanalesByIdHandler } from "../handlers/canal/get-canales-by-id-handler/get-canales-by-id-handler.ts"
import type { GetCanalesByIdCommand } from "../handlers/canal/get-canales-by-id-handler/models/get-canales-by-id-command.ts"

export const SocketHandler = (io: any) => {
  io.on('connection', (socket: any) => {
    console.log('a user connected')
    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
    socket.on('message', (msg: any) => {
      console.log('message: ' + msg)
      io.emit('message', msg)
    })
    socket.on('get-canals', async (command: GetCanalesByIdCommand, callback) => {
      const handler = new GetCanalesByIdHandler()
      const canals = await handler.handle(command)
      callback({
        ok: true,
        data: canals,
      });
    })
  })
}
