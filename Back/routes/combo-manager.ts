import express from 'express';
import { CombosLocales } from '../handlers/combos-handlers/combos-locales/combos-locales.ts';
import type { ComboModel } from '../handlers/combos-handlers/Models/combosModels.ts';
import type { RequestWithParams } from '../models/generic-request.ts';
import { CombosRemotos } from '../handlers/combos-handlers/combos-remotos/combos-remotos.ts';

const router = express.Router();

const _combosLocales = new CombosLocales;
const _combosRemotos = new CombosRemotos;

router.get('/:comboName', async (req: RequestWithParams<ComboRequest>, res: any) => {

    const comboName = req.params.comboName;

    let data: ComboModel[] = []

    switch (comboName){
        case 'EstadoPublicacionV1':
            data = _combosLocales.GetEstadoPublicacion();
            break;
        case 'SectorEmpresaV1':
            data = await _combosRemotos.GetSectorEmpresa();
            break;
        default:
            res.status(400).send('No se encontro el combo');
    }
    
    
    res.status(200).send({ 
        data
    });
});

export default router


interface ComboRequest{
    comboName: string;
}