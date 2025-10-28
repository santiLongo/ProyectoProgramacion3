import { environments } from "../../../configs/enviroments";
// src/services/comboService.ts
export interface ComboModel {
  numero: number | string;
  descripcion: string;
}

export const getCombo = async (comboName: string): Promise<ComboModel[]> => {
 const path = environments.apiUrl;
  
  try {
    const response = await fetch(path + `combos/${comboName}`);
    if (!response.ok) {
      throw new Error(`Error al obtener el combo: ${response.statusText}`);
    }
    const json = await response.json();
    return json.data ?? [];
  } catch (error) {
    console.error("Error en getCombo:", error);
    return [];
  }
};
