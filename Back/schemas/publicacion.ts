import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const publicacionSchema = new Schema({
    titulo: { type: String, required: true, trim: true},
    descripcion: { type: String, required: true, trim: true},
    sector: { type: ObjectId, ref: 'Sector', required: true},
    tags: { type: String, required: true, trim: true},
    estado: { type: String, required: true, lowercase: true, trim: true},
    empresa: {type: ObjectId, ref: 'Empresa', required: true},
    fechaAlta: {type: Date, required: true}
});

const Publicacion = mongoose.model('Publicaciones', publicacionSchema);

export default Publicacion;