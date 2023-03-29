import express from "express";
import usuarios from "./usuariosRoutes.js";
import publicacoes from "./publicacoesRoutes.js";
import parceiros from "./parceirosRoutes.js";
import login from './loginRoutes.js'
// import parceiros from "./parceirosRoutes.js";

const routes = (app) => {
  app.route('/').get((rep, res) => {
    res.status(200).redirect('/docs')
  })

  app.use(
    express.json(),
    usuarios,
    publicacoes,
    parceiros,
    login
  )
}

export default routes