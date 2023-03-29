import parceiros from "../../models/Parceiro.js"

function FiltrosParceiros(req) {
  const nome = req.query.nome
  const page = req.query.page
  const limit = req.query.limit

  const options = {
    page: parseInt(page) || 1,
    limit: parseInt(limit) > 5 ? 5 : parseInt(limit) || 5
  }

  const query = {}

  if(nome){
    const regexNome = new RegExp(nome, 'i')
    query.nome = regexNome
  }

  const filters = {
    query: query,
    options: options
  }

  return filters
}

export default FiltrosParceiros