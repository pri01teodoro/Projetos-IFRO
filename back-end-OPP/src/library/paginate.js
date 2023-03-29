/**
 * Retorna uma formatação dos dados informados, adicionando as informações da paginação.
 * - Data deve ser um array de objetos, seu conteúdo é irrelevante.
 * - Options deve possuir o padrão {
 *   page: inteiro,
 *   limit: inteiro
 * }
 * 
 *    - Limit é o máximo que pode aparecer por página.
 *    - Page é a página que começa a contagem.
 */
function paginate(data, options){
  let paginated = data
  const total = paginated.length
  const pages = Math.ceil(total / options.limit)

  for (let i = 0; i < options.page; i++){
    paginated = data.slice(0 + options.limit * i, options.limit + options.limit * i)
  }

  return({
    docs: paginated,
    total: total,
    limit: options.limit,
    page: options.page,
    pages: pages
  })
}

export default paginate
