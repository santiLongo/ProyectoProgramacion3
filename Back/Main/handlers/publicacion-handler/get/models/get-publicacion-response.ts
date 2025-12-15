export interface GetPublicacionResponse{
    publicacion: PublicacionResponse;
    comentarios: Array<ComentariosPublicacionResponse>;
    propuestas: Array<PropuestasResponse>;
}

export interface PublicacionResponse{ 
    titulo: string;
    descripcion: string;
    tags: string;
    empresa: string;
    estado: string;
    fechaPublicacion: Date;
}

export interface ComentariosPublicacionResponse{
    usuario: string;
    comentario: string;
    fecha: Date
}

export interface PropuestasResponse{
    id: string;
    emprendedorId: string;
    emprendedor: string;
    titulo: string;
    descripcion: string;
    estado: string;
    fecha: Date;
    promedioVotos: number;
    puedoVotar: boolean;
    comentarios: Array<ComentariosPropuestasResponse>;
}

export interface ComentariosPropuestasResponse{
    usuario: string;
    comentario: string;
    fecha: Date;
}