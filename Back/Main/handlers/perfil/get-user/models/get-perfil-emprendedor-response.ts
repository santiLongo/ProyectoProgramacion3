export interface GetPerfilEmprendedorResponse{
    id: string;
    userName: string;
    role: string;
    solicito: boolean;
    nombre?: string;
    apellido?: string;
    email?: string;
    pais?: string;
    dni?: number;
    fechaNacimiento: Date
}
