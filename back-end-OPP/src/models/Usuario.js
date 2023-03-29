import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate';
mongoose.set('debug', true)

const usuarioSchema = new mongoose.Schema(
    {
        nome: { type: String, required: true },
        email: {
            type: String,
            required: true,
            match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        },
        senha: { type: String, required: true },
        formacao: [
            {
                titulo: { type: String, required: true },
                curso: { type: String, required: true },
                _id: {
                    required: false
                }
            },
        ],
        ativo: { type: Boolean, required: true },
        path_photo: { type: String, required: true},
        rotas: [
            {
                rota: { type: String, required: true, trim: true, unique: true } ,
                verbo_get: { type: Boolean } ,
                verbo_put: { type: Boolean } ,
                verbo_patch: { type: Boolean } ,
                verbo_delete: { type: Boolean } ,
                verbo_post: { type: Boolean } 
            }
        ]
    },

    { versionKey: false }
);

usuarioSchema.plugin(mongoosePaginate);

const usuarios = mongoose.model('usuarios', usuarioSchema);

export default usuarios;
