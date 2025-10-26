// src/services/comboService.ts
export interface ComboModel {
  numero: number | string;
  descripcion: string;
}

export const getCombo = async (comboName: string): Promise<ComboModel[]> => {
  try {
    const response = await fetch(`http://localhost:9000/api/combos/${comboName}`);
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
