import { ObjectId } from "mongodb";
import Empresa from "../../../schemas/empresa.ts";
import type { UpdatePerfilEmpresaCommand } from "./models/update-perfil-empresa.command.ts";

export class UpdateEmpresaHandler {
  public async handle(command: UpdatePerfilEmpresaCommand, IdUsuario: string) {
    const user = await Empresa.findOne({ user: IdUsuario }).populate<{user: {email: string}}>('user');

    if (!user) {
      throw new Error('Empresa no encontrada');
    }

    if (command.nombre === undefined || command.nombre.trim() === '')   {
        throw new Error('El nombre no puede estar vacio');
    }

    if (command.email === undefined || command.email.trim() === '')   {
        throw new Error('El email no puede estar vacio');
    }

    if (command.sector === undefined || command.sector.trim() === '')   {
        throw new Error('El sector no puede estar vacio');
    }

    user.name = command.nombre;
    user.user.email = command.email;
    user.sector = command.sector!;

    await user.save();
  }
}