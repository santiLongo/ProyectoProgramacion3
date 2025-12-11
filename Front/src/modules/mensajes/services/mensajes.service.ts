import { io, Socket } from "socket.io-client";
import { environments } from "../../../configs/enviroments";
import { UserService } from "../../../services/user.service";
import type { GetCanalesByIdCommand } from "../models/get-canales-by-id-command";
import type { GetCanalesByIdResponse } from "../models/get-canales-by-id-response";
import type { SendMessageCommand } from "../models/send-message-commnad";
import type { GetMensajesCommand } from "../models/get-mensajes-command";
import type { GetMensajesResponse } from "../models/get-mensajes-response";

export class MensajesService {
  public socket: Socket;

  constructor() {
    console.log("Conectando a:", environments.mensajesUrl);

    const token = UserService.token();

    this.socket = io(environments.mensajesUrl, {
      transports: ["websocket"],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      auth: {
        token: token ? `Bearer ${token}` : null,
      },
    });

    this.socket.on("connect", () => {
      console.log("Conectado a Socket.IO:", this.socket.id);
    });

    this.socket.on("connect_error", (err) => {
      console.error("Error de conexión:", err.message);
    });
  }

  disconnect() {
    this.socket.disconnect();
  }

  joinChannel(channelId: string) {
    this.socket.emit("join-channel", channelId);
  }

  leaveChannel(channelId: string) {
    this.socket.emit("leave-channel", channelId);
  }

  sendMessage(msg: SendMessageCommand) {
    this.socket.emit("send-message", msg);
  }

  onMessage(callback: (msg: string) => void) {
    this.socket.on("message", callback);
  }

  getCanals(command: GetCanalesByIdCommand, callback: (canals: any) => void) {
    this.socket.emit("get-canals", command, (response: any) => {
      if (response.ok) callback(response.data);
      else console.error("Error en get-canals:", response.error);
    });
  }

  onGetCanals(callback: (canals: Array<GetCanalesByIdResponse>) => void) {
    this.socket.on("get-canals", callback);
  }

  async getMensajes(command: GetMensajesCommand, callback: (canals: any) => void) {
    this.socket.emit("get-mensajes", command, (response: any) => {
      if (response.ok) callback(response.data);
      else console.error("Error en get-canals:", response.error);
    });
  }

  onGetMensaje(callback: (mensajes: GetMensajesResponse) => void) {
    this.socket.on("recive-message", callback);
  }
}
