import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const publicacionSchema = new Schema({
    titulo: { type: String, required: true, trim: true},
    descripcion: { type: String, required: true, trim: true},
    sector: { type: ObjectId, ref: 'Sector', required: true},
    tags: { type: String, trim: true},
    estado: { type: ObjectId, ref: 'EstadoPublicacion', required: true, lowercase: true, trim: true},
    empresa: {type: ObjectId, ref: 'Empresa', required: true},
    fechaAlta: {type: Date, required: true}
});

publicacionSchema.virtual("comentarios", {
    ref: "ComentarioPublicacion",
    localField: "_id",
    foreignField: "publicacion"
})

publicacionSchema.set("toObject", { virtuals: true });

const Publicacion = mongoose.model('Publicaciones', publicacionSchema);

export default Publicacion;