export interface GetSolicitudesResponse {
    id: string;
    fechaAlta: Date;
    fechaSolicitud: Date;
    email: string;
    comentarioEnviados: number;
    nombre: string;
    apellido: string;
    dni: number;
    fechaNacimiento: Date;
    nacionalidad: string;
}