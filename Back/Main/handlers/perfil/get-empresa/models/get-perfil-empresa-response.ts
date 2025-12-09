export interface GetPerfilEmpresaResponse{
    email: string;
    estado: boolean;
    fechaAlta: Date;
    nombre: string;
    cuit: string;
    fechaFundacion: Date;
    sector: { name: string; id: string };
    publicaciones: GetEmpresaPublicaciones[] | undefined;
}

export interface GetEmpresaPublicaciones{
    id: string;
    titulo: string;
    descripcion: string;
    sector: string;
    tags: string;
    estado: string;
    fecha: Date;
}