import publicacoes from "../models/Publicacao.js";
import FiltrosPublicacao from "./filtros/FiltrosPublicacao.js";
import usuarios from '../models/Usuario.js'
import userValidation from "../../validation/userValidation.js";

class PublicacaoController {

  // ok
  static listarPublicacoes = async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    try {
      const { query, options } = FiltrosPublicacao(req)

      const data = await publicacoes.paginate(query, options)

      return res.json(data)
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  }

  // ok
  static listarPublicacaoPorId = async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    try {
      const id = req.params.id;
      publicacoes.findById(id)
        .exec((err, publicacoes) => {
          if (err) {
            res.status(400).send({ message: `${err.message} - Id da publicação não localizado.` })
          } else {
            res.status(200).send(publicacoes);
          }
        })
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }

  }

  static cadastrarPublicacao = async (req, res) => {
    res.setHeader('Content-Type', 'application/json')

    try {
      let publicacao = new publicacoes(req.body);
      userValidation(req, res, req.method, usuarios, async () => {
        publicacao.save((err) => {
          if (err) {
            res.status(500).send({ message: `${err.message} - Falha ao cadastrar publicação.` })
          } else {
            res.status(201).send(publicacao.toJSON())
          }
        })
      })
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }

  }

  static atualizarPublicacao = async (req, res) => {
    res.setHeader('Content-Type', 'application/json')

    try {
      const id = req.params.id;
      userValidation(req, res, req.method, usuarios, async () => {
        publicacoes.findByIdAndUpdate(id, { $set: req.body }, (err) => {
          if (!err) {
            res.status(200).send({ message: 'Publicação atualizada com sucesso' })
          } else {
            res.status(500).send({ message: err.message })
          }
        })
      })
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }


  }

  static excluirPublicacao = async (req, res) => {
    try {
      const id = req.params.id;
      userValidation(req, res, req.method, usuarios, async () => {
        publicacoes.findByIdAndDelete(id, (err) => {
          if (!err) {
            res.status(200).send({ message: 'Publicação removida com sucesso' })
          } else {
            res.status(500).send({ message: err.message })
          }
        })
      })
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  }
}

export default PublicacaoController;