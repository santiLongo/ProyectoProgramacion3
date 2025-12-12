import User from "../../../schemas/user.ts";
import type { GetPerfilEmprendedorCommand } from "./models/get-perfil-emprendedor-command.ts";
import type { GetPerfilEmprendedorResponse } from "./models/get-perfil-emprendedor-response.ts";


export class GetPerfilEmprendedorHandler {
    async handle(command: GetPerfilEmprendedorCommand): Promise<GetPerfilEmprendedorResponse> {
        if (command.id.trim() === "" || command.id === undefined) {
            throw new Error("El id es obligatorio");
        }

        const usuario = await User.findById(command.id).populate<{emprendedor: {
            nombre: string,
            apellido: string,
            dni: number,
            fechaNacimiento: Date,
            nacionalidad: string
        }}>("emprendedor").
        populate<{role: {name: string}}>("role").exec();

        if (!usuario) {
            throw new Error("Usuario no encontrado");
        }

        return {
            role: usuario.role.name,
            id: usuario._id.toString(),
            solicito: usuario.emprendedor === null || usuario.emprendedor === undefined,
            email: usuario.email,
            userName: usuario.userName,
            nombre: usuario.emprendedor?.nombre,
            apellido: usuario.emprendedor?.apellido,
            dni: usuario.emprendedor?.dni,
            fechaNacimiento: usuario.emprendedor?.fechaNacimiento,
            pais: usuario.emprendedor?.nacionalidad
        };
    }
}