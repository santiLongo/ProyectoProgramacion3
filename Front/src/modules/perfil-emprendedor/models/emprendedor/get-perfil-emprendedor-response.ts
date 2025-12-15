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
    datosAdicionales?: DatosAdicionalesEmprendedor;
    propuestsas?: PropuestasEmprendedor[];
}

export interface DatosAdicionalesEmprendedor {
    propuestasEnviadas: number;
    propuestasRechazadas: number;
    propuestasAceptadas: number;
}

export interface PropuestasEmprendedor {
    id: string;
    titulo: string;
    descripcion: string;
    presupuesto: number;
    estado: string;
    publicacionId: string;
    publicacion: string;
    fecha: Date;
    votos?: number;
    promedioVotos?: number;
}