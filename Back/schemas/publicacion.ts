import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const publicacionSchema = new Schema({
    titulo: { type: String, required: true, lowercase: true, trim: true},
    descripcion: { type: String, required: true, lowercase: true, trim: true},
    sector: { type: ObjectId, ref: 'Sector', required: true},
    tags: { type: String, required: true, lowercase: true, trim: true},
    estado: { type: String, required: true, lowercase: true, trim: true},
    empresa: {type: ObjectId, ref: 'Empresa', required: true}
});

const Pubicacion = mongoose.model('Pubicacion', publicacionSchema);

export default Pubicacion;