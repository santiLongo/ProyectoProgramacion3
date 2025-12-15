import User from "../../../schemas/user.ts";
import type { UpdateEmprendedorCommand } from "./models/update-emprendedor-command.ts";

export class UpdateEmprendedorHandler {
    async handle(command: UpdateEmprendedorCommand, idUsuario: string) {
        if(!command.email || command.email.trim() === ''){
            throw new Error('Se necesita un email para llevar a cabo esta accion')
        }

        const user = await User.findById(idUsuario);

        if(!user){
            throw new Error('No se encontro el usuario');
        }

        user.email = command.email

        user.save();
    }
}