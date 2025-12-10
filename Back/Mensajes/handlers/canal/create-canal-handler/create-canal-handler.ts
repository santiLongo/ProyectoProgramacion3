import Canal from '../../../schemas/canal.ts';
import Propuesta from '../../../schemas/propuesta.ts';
import type { CreateCanalCommand } from './models/create-canal-command.ts'

export class CreateCanalHandler {
  public async handle(command: CreateCanalCommand): Promise<void> {
    this.Validar(command)

    const canal = await Canal.findOne({ propuesta: command.propuestaId });

    if (canal) {
      return;
    }

    const propuesta = await Propuesta.findById(command.propuestaId);

    if (!propuesta) {
      throw new Error('No se encontró la propuesta asociada al canal.');
    }

    await Canal.create({
      name: propuesta.titulo,
      user1: command.user1Id,
      user2: command.user2Id,
      propuesta: command.propuestaId,
    });
  }

  private Validar(command: CreateCanalCommand): void {
    if (!command.user1Id || command.user1Id.trim() === '') {
      throw new Error('Se necesita un ID de usuario1 válido.')
    }
    if (!command.user2Id || command.user2Id.trim() === '') {
      throw new Error('Se necesita un ID de usuario2 válido.')
    }
    if (!command.propuestaId || command.propuestaId.trim() === '') {
      throw new Error('Se necesita un ID de propuesta válido.')
    }
  }
}
