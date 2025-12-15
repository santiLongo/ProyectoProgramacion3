import { populate } from "dotenv";
import Propuesta from "../../../schemas/propuesta.ts";
import User from "../../../schemas/user.ts";
import type { GetPerfilEmprendedorCommand } from "./models/get-perfil-emprendedor-command.ts";
import type { DatosAdicionalesEmprendedor, GetPerfilEmprendedorResponse, PropuestasEmprendedor } from "./models/get-perfil-emprendedor-response.ts";
import Solicitud from "../../../schemas/solicitud.ts";
import { Roles } from "../../../enums/roles.ts";


export class GetPerfilEmprendedorHandler {
    private _propuestas: PropuestasEmprendedor[] = [];
    private _datosAdicionales: DatosAdicionalesEmprendedor = {
        propuestasAceptadas: 0,
        propuestasEnviadas: 0,
        propuestasRechazadas: 0
    };

    async handle(command: GetPerfilEmprendedorCommand): Promise<GetPerfilEmprendedorResponse> {
        if (command.id.trim() === "" || command.id === undefined) {
            throw new Error("El id es obligatorio");
        }

        const usuario = await User.findById(command.id).populate<{emprendedor: { 
            _id: string,
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

        if(usuario.emprendedor){
            const propuestsas = await Propuesta.find({emprendedor: usuario.emprendedor?._id})
            .populate<{publicacion: {titulo: string, _id: string}}>('publicacion')
            .populate<{estado: {name: string}}>('estado')
            .populate<{votos: {valor: number}}>('votos').exec();

            this._propuestas = propuestsas.map<PropuestasEmprendedor>((propuesta) => ({
                id: propuesta._id.toString(),
                titulo: propuesta.titulo,
                descripcion: propuesta.descripcion,
                presupuesto: propuesta.presupuesto,
                estado: propuesta.estado.name,
                publicacionId: propuesta.publicacion._id.toString(),
                publicacion: propuesta.publicacion.titulo,
                fecha: propuesta.fecha,
                votos: propuesta.votos?.length,
                promedioVotos: propuesta.votos?.length > 0 ? propuesta.votos.reduce((acc, voto) => acc + voto.valor, 0) / propuesta.votos.length : 0
            }));

            this._datosAdicionales.propuestasEnviadas = this._propuestas.length;
            this._datosAdicionales.propuestasAceptadas = this._propuestas.filter(p => p.estado === 'Aceptada').length;
            this._datosAdicionales.propuestasRechazadas = this._propuestas.filter(p => p.estado === 'Rechazada').length;
        }

        let solicito = false;

        const solicitud = await Solicitud.findOne({user: command.id})

        if(!solicitud && usuario.role.name === 'normalUser'){
            solicito = true;
        }

        return {
            role: usuario.role.name,
            id: usuario._id.toString(),
            solicito: solicito,
            email: usuario.email,
            userName: usuario.userName,
            nombre: usuario.emprendedor?.nombre,
            apellido: usuario.emprendedor?.apellido,
            dni: usuario.emprendedor?.dni,
            fechaNacimiento: usuario.emprendedor?.fechaNacimiento,
            pais: usuario.emprendedor?.nacionalidad,
            datosAdicionales: this._datosAdicionales,
            propuestsas: this._propuestas
        };
    }
}