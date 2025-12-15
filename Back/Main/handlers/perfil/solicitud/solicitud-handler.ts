import Emprendedor from '../../../schemas/emprendedor.ts'
import Solicitud from '../../../schemas/solicitud.ts'
import User from '../../../schemas/user.ts'
import type { SolicitudEmprendedorCommand } from './models/solicitud-emprendedor-command.ts'

export class SolicitudHandler {
  async handle(command: SolicitudEmprendedorCommand, idUsuario: string) {
    this.Validar(command)

    const user = await User.findById(idUsuario).populate<{ emprendedor: {} }>('emprendedor')

    if (!user) {
      throw new Error('No se encontro su usuario')
    }

    const solicitud = await Solicitud.findOne({ user: idUsuario })

    if (solicitud?.estado === false) {
      throw new Error('Usted ya tiene una solicitud enviada')
    }

    Solicitud.create({
      estado: false,
      fecha: new Date(),
      user: idUsuario,
    })

    if (!user.emprendedor) {
      Emprendedor.create({
        nombre: command.nombre,
        apellido: command.apellido,
        dni: command.dni,
        fechaNacimiento: command.fechaNacimiento,
        nacionalidad: command.nacionalidad,
        user: idUsuario,
      })
    }
  }

  private Validar(command: SolicitudEmprendedorCommand) {
    if (command.nombre === undefined || command.nombre.trim() === '') {
      throw new Error('Nombre invalido')
    }
    if (command.apellido === undefined || command.apellido.trim() === '') {
      throw new Error('Apellido invalido')
    }
    if (command.nacionalidad === undefined || command.nacionalidad.trim() === '') {
      throw new Error('Nacionalidad invalido')
    }
    if (command.dni === undefined || command.dni === 0) {
      throw new Error('DNI invalido')
    }
    if (command.fechaNacimiento === undefined) {
      throw new Error('Fecha de Nacimiento invalidad invalido')
    }
  }
}
