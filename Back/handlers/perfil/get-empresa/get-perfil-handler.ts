import Empresa from '../../../schemas/empresa.ts'
import Publicacion from '../../../schemas/publicacion.ts'
import type { GetPerfilEmpresaCommand } from './models/get-perfil-empresa-command.ts'
import type {
  GetEmpresaPublicaciones,
  GetPerfilEmpresaResponse,
} from './models/get-perfil-empresa-response.ts'

export class GetPerfilEmpresaHandler {
  public async handle(command: GetPerfilEmpresaCommand) {
    if (command.id == '' || command.id == undefined) {
      throw new Error('Se necesita un id para buscar el perfil')
    }

    let empresa = await Empresa.findById(command.id)
      .populate<{
        user: { userName: string; email: string; fechaAlta: Date; estado: boolean }
      }>('user')
      .populate<{ sector: { name: string, _id: string } }>('sector')

    if (!empresa) {
      empresa = await Empresa.findOne({ user: command.id })
        .populate<{
          user: { userName: string; email: string; fechaAlta: Date; estado: boolean }
        }>('user')
        .populate<{ sector: { name: string } }>('sector')

      if (!empresa) {
        throw new Error('No se encontro la empresa')
      }
    }

    const publicaciones = await Publicacion.find({ empresa: empresa?._id })
      .populate<{ estado: { name: string } }>('estado')
      .populate<{ sector: { name: string } }>('sector')

    const response: GetPerfilEmpresaResponse = {
      email: empresa.user?.email!,
      estado: empresa.user?.estado,
      fechaAlta: empresa.user.fechaAlta,
      nombre: empresa.name,
      cuit: empresa.cuit,
      fechaFundacion: empresa.fechaFundacion,
      sector: {name: empresa.sector?.name, id: empresa.sector?._id},
      publicaciones: publicaciones?.map<GetEmpresaPublicaciones>((publi) => {
        return {
          id: publi._id.toString(),
          titulo: publi.titulo,
          descripcion: publi.descripcion,
          fecha: publi.fechaAlta,
          tags: publi.tags!,
          estado: publi.estado.name,
          sector: publi.sector.name,
        }
      }),
    }

    return response
  }
}
