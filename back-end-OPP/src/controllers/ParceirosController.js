import parceiros from "../models/Parceiro.js";
import FiltrosParceiros from "./filtros/FiltrosParceiros.js";
import usuarios from '../models/Usuario.js'
import userValidation from "../../validation/userValidation.js";

class ParceirosController {
  static listarParceiros = async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    try {
      const { query, options } = FiltrosParceiros(req)

      const data = await parceiros.paginate(query, options)

      return res.json(data)

    } catch (err) {
      console.error(err);
      return res.status(400).send(err)
    }
  }

  static listarParceiroPorId = async (req, res) => {
    res.setHeader('Content-Type', 'application/json')

    try {
      const id = req.params.id;

      parceiros.findById(id).exec(
        (err, parceiro) => {
          if (err){
            res.status(400).send({message: `${err.message} - O parceiro com esse ID não pode ser localizado`})
          } else {
            res.status(200).send(parceiro)
          }
        }
      );
    } catch (err) {
      console.error(err);
      return res.status(400).send(err)
    }

  }

  static cadastrarParceiro = async (req, res) => {
    res.setHeader('Content-Type', 'application/json')

    try {
      userValidation(req, res, req.method, usuarios, async () => {
        const myNewSave = new parceiros({
          nome: req.body.nome,
          ativo: req.body.ativo,
          caminhoLongo: req.body.caminhoLongo,
          descricao: req.body.descricao,
        })

        myNewSave.save((err, data) => {
          res.status(201).send(data)
        })
      })
    } catch (err) {
      console.error(err);
      return res.status(400).send(err)
    }

  }

  static atualizarParceiro = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    try {
      userValidation(req, res, req.method, usuarios, async () => {
        const id = req.params.id;
        parceiros.findByIdAndUpdate({ _id: id }, {
          nome: req.body.nome,
          ativo: req.body.ativo,
          caminhoLongo: req.body.caminhoLongo,
          descricao: req.body.descricao,
        }, { new: true }).then((data, err) => {
          if (data) {
            return res.status(200).send(data);
          } else {
            res.status(400);
            return res.send(err);
          }
        })
      })
    } catch (err) {
      console.error(err);
      return res.status(400).send(err)
    }
  }

  static excluirParceiro = (req, res) => {
    try {
      const id = req.params.id;
      userValidation(req, res, req.method, usuarios, async () => {
        parceiros.findByIdAndDelete(id, (err, docs) => {
          res.status(200).send({ message: "Parceiro removido com sucesso" })
        })
      })
    } catch (err) {
      console.error(err);
      return res.status(400).send(err)
    }

  }

  static listarParceiroPorNome = (req, res) => {
    const nomefromQuery = req.query.nome;

    try {
      userValidation(req, res, req.method, usuarios, async () => {
        parceiros.find({ nome: { 'nome': { "$regex": nome, "$options": "i" } } }).then(result => {
          res.status(200)
          res.send(result)
        });
      })
    } catch (err) {
      console.error(err);
      return res.status(400).send(err)
    }
  }

}

export default ParceirosController;