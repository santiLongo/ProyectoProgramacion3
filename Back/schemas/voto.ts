import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const votosSchema = new Schema({
    idPublicacion: { type: ObjectId, ref: 'Publicaciones', required: true},
    idUsuario: { type: ObjectId, ref: 'User', required: true},
    valor: { type: Number, required: true}
});

const Voto = mongoose.model('Voto', votosSchema);

export default Voto;