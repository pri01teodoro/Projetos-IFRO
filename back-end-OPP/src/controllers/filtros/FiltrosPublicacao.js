import paginate from "../../library/paginate.js"
import publicacoes from "../../models/Publicacao.js"

function FiltrosPublicacao(req) {
    const titulo = req.query.titulo
    const usuarioId = req.query.usuarioId
    const page = req.query.page
    const limit = req.query.limit
    const { dataInicial, dataFinal } = req.query
    const tags = req.query.tags
    const tipo = req.query.tipo
    const registro = req.query.registro

    const options = {
        page: parseInt(page) || 1,
        limit: parseInt(limit) < 10 ? parseInt(limit) : 10 || 10,
    }

    const query = {}
    
    if(titulo){
      const regexTitulo = new RegExp(titulo, 'i')

      query.titulo = regexTitulo;
    }

    if(dataInicial && dataFinal){
      const inicial = new Date(dataInicial);
      const final = new Date(dataFinal)
      query.data = {
        $gte: inicial,
        $lte: final,
      }
    }

    if(tipo){
      const arrayTipo = tipo.split(";")
      query.tipo = {
        $in: arrayTipo
      }
    }

    if(registro){

      const regexRegistro = new RegExp(registro,'i')
      query.registro = regexRegistro

    }

    if(tags){
      const arrayTags = tags.split(";")
      query.tags = {
        $all: arrayTags
      }

    }

    if(usuarioId){
      query.usuarioId = usuarioId

    }



    const filters = {
      query: query,
      options: options
    }

    return filters
}

export default FiltrosPublicacao