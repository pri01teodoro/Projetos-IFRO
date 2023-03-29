import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate';

const parceirosSchema = new mongoose.Schema({
    nome: {type: String, required: true, trim: true},
    ativo: {type: Boolean, required: false, default: true},
    caminho_logo: {type: String, required: false},
    descricao: {type: String, required: false}
})

parceirosSchema.plugin(mongoosePaginate)

const parceiros = mongoose.model("parceiros", parceirosSchema);

export default parceiros;
