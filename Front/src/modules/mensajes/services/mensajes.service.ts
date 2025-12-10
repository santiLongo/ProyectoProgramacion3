import { io, Socket } from "socket.io-client";
import { environments } from "../../../configs/enviroments";
import { UserService } from "../../../services/user.service";
import type { GetCanalesByIdCommand } from "../models/get-canales-by-id-command";
import type { GetCanalesByIdResponse } from "../models/get-canales-by-id-response";

export class MensajesService {
  private socket: Socket;

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

  sendMessage(msg: string) {
    this.socket.emit("message", msg);
  }

  onMessage(callback: (msg: any) => void) {
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
}
