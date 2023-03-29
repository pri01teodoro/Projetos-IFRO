import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate';

const publicacaoSchema = new mongoose.Schema(
    {
        // _id: { type: String, required: true },
        titulo: { type: String, required: true, trim: true },
        data: { type: Date, required: true },
        tipo: { type: String, required: true },
        registro: { type: String, required: true },
        tags: { type: [String] },
        usuarioId: {type: mongoose.Schema.Types.ObjectId},

    },
    { versionKey: false }
);

publicacaoSchema.plugin(mongoosePaginate);

const publicacoes = mongoose.model('publicacoes', publicacaoSchema);

export default publicacoes;