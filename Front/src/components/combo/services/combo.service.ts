import { environments } from "../../../configs/enviroments";
import { get } from "../../../services/http.service";
// src/services/comboService.ts
export interface ComboModel {
  numero: number | string;
  descripcion: string;
}

export const getCombo = async (comboName: string): Promise<ComboModel[]> => {
 const path = environments.apiUrl;
  
  try {
    const response = await get(path + `combos/${comboName}`);
    if (!response) {
      throw new Error(`Error al obtener el combo: ${response.statusText}`);
    }
    return response.data ?? [];
  } catch (error) {
    console.error("Error en getCombo:", error);
    return [];
  }
};
