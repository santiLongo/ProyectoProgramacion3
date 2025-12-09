import type { ObjectId } from "mongodb";

export interface ComboModel {
    numero: string | number | ObjectId;
    descripcion: string;
}