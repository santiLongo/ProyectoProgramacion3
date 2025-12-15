import { ObjectId } from 'mongodb'
import { Roles } from '../../../enums/roles.ts'
import Solicitud from '../../../schemas/solicitud.ts'
import type { RespuestaSolcitudCommand } from './models/respuesta-solicitud-command.ts'
import Role from '../../../schemas/role.ts'
import User from '../../../schemas/user.ts'

export class RespuestaSolcitudHandler {
  async handle(command: RespuestaSolcitudCommand, idSoporte: string) {
    this.Validar(command)

    const solicitud = await Solicitud.findById(command.idSolcitud).populate<{
      user: { _id: string }
    }>('user')

    if (!solicitud) {
      throw new Error('No se encontro la solicitud')
    }

    if (command.respuesta) {
      const emprendedorRole = await Role.findById(Roles.emprendedor)
      const user = await User.findById(solicitud.user._id)
      if (!user) {
        throw new Error('Usuario no encontrado')
      }
      if (!emprendedorRole) {
        throw new Error('Rol emprendedor no encontrado')
      }
      user.role = emprendedorRole?._id
      user?.save()
    }

    solicitud.userAutoriza = new ObjectId(idSoporte)
    solicitud.estado = true
    solicitud.save()
  }
  private Validar(command: RespuestaSolcitudCommand) {
    if (command.idSolcitud === undefined || command.idSolcitud.trim() === '') {
      throw new Error('Se necesita un Id de solicitud para esta accion')
    }
    if (command.respuesta === undefined) {
      throw new Error('No se encuentra una respuesta para esta solicitud')
    }
  }
}
