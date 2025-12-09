import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const votosSchema = new Schema({
    propuesta: { type: ObjectId, ref: 'Propuestas', required: true},
    user: { type: ObjectId, ref: 'User', required: true},
    valor: { type: Number, required: true}
});

votosSchema.index({ propuesta: 1, user: 1 }, { unique: true });

const Voto = mongoose.model('Voto', votosSchema);

export default Voto;