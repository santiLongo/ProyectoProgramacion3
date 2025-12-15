import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'

const { Schema } = mongoose

const propuestaSchema = new Schema({
  titulo: { type: String, required: true, trim: true},
  descripcion: { type: String, required: true, trim: true},
  presupuesto: { type: Number, required: true, trim: true},
  estado: { type: ObjectId, ref: 'EstadoPropuesta', required: true, lowercase: true, trim: true},
  fecha: { type: Date, required: true, lowercase: true, trim: true},
  emprendedor: { type: ObjectId, ref: 'Emprendedores', required: true },
  publicacion: { type: ObjectId, ref: 'Publicaciones', required: true },
})

propuestaSchema.index({ emprendedor: 1, publicacion: 1 }, { unique: true });

propuestaSchema.virtual("comentarios", {
    ref: "ComentarioPropuesta",
    localField: "_id",
    foreignField: "propuesta"
})

propuestaSchema.virtual("votos", {
    ref: "Voto",
    localField: "_id",
    foreignField: "propuesta"
})

propuestaSchema.set("toObject", { virtuals: true });

const Propuesta = mongoose.model('Propuestas', propuestaSchema)

export default Propuesta