import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const solicitudSchema = new Schema({
    user: { type: ObjectId, ref: 'User', required: true},
    fecha: { type: Date, required: true},
    estado: { type: Boolean, required: true},
    userAutoriza: { type: ObjectId, ref: 'User'}
});

const Solicitud = mongoose.model('Solicitud', solicitudSchema);

export default Solicitud;