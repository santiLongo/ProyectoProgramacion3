import Canal from "../../../schemas/canal.ts";
import type { GetCanalesByIdCommand } from "./models/get-canales-by-id-command.ts";
import type { GetCanalesByIdResponse } from "./models/get-canales-by-id-response.ts";

export class GetCanalesByIdHandler {
  public async handle(command: GetCanalesByIdCommand) {
    if(!command.id || command.id.trim() === '') {
      throw new Error('Se necesita un ID de usuario válido.');
    }

    const canales = await Canal.find({ $or: [ { user1: command.id }, { user2: command.id } ] });

    return canales.map<GetCanalesByIdResponse>(canal => ({
      idCanal: canal._id.toString(),
      name: canal.name,
    }));
  }
}