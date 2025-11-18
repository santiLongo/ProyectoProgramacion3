import Emprendedor from '../../../schemas/emprendedor.ts'

export class GetEmprendedorHandler {
  public async handler(req: GetEmprendedorCommand): Promise<EmprendedorFormModel> {
    if (req.idEmprendedor == null || req.idEmprendedor == '') {
      throw new Error('Se necesita un id de emprendedor para esta accion')
    }

    const emprendedor = await Emprendedor.findOne({ user: req.idEmprendedor }).populate('user')

    if (!emprendedor) {
      throw new Error('No se encontro un emprendedor con el id proporcionado')
    }

    return {
      nombre: emprendedor.nombre,
      apellido: emprendedor.apellido,
      dni: emprendedor.dni,
      email: emprendedor.user.email ?? '',
      fechaNacimiento: emprendedor.fechaNacimiento,
      pais: emprendedor.nacionalidad ?? '',
    }
  }
}

export interface GetEmprendedorCommand {
  idEmprendedor: string
}

export interface EmprendedorFormModel {
  nombre: string
  apellido: string
  dni: number
  email: string
  fechaNacimiento: Date
  pais: string
}
