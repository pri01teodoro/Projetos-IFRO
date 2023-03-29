import faker from 'faker-br';
import db from '../config/dbConnect.js'
import bcrypt from 'bcrypt'
import Parceiro from '../models/Parceiro.js'
import usuarios from '../models/Usuario.js';
import publicacoes from '../models/Publicacao.js';
import parceiros from '../models/Parceiro.js';

db.on("error", console.log.bind(console, "Conexão com o banco falhou!"));
db.once("open", () => {
  console.log("Conexão com o banco estabelecida!")
})

const getRandomInt = (max) => (
  Math.floor(Math.random() * max + 1)
)

const generateTags = () => {
  let tags = [];

  for (let i = 0; i <= 10; i++)
    tags.push(faker.lorem.word())

  return (tags)
}

const pick = (quantity, pickFrom = []) => {
  let result = []

  while (quantity > 0) {
    const candidate = pickFrom[Math.floor(Math.random() * pickFrom.length)]

    if (!result.find(res => res === candidate)) {
      result.push(candidate)
      quantity--;
    }
  }

  return result
}

const generateHash = () => {
  return bcrypt.hashSync("12345678", 8)
}

await usuarios.deleteMany()
await publicacoes.deleteMany()

const generateUsuarios = async (qtdUsuarios) => {
  const usuariosArray = []

  for (let i = 0; i < qtdUsuarios; i++) {
    const nome = faker.name.findName();
    const email = nome.toLowerCase().replaceAll(" ", "") + getRandomInt(99) + "@gmail.com";

    const routes = ["parceiros", "parceiros:id", "publicacoes", "publicacoes:id", "usuarios", "usuarios:id"]

    const usuario = {
      nome: nome,
      email: email,
      senha: generateHash(),
      formacao: [{
        titulo: getRandomInt(2) > 1 ? "Graduação" : "Mestrado",
        curso: getRandomInt(2) > 1 ? "Ciências Sociais" : "Ciências da computação"
      }],
      ativo: getRandomInt(2) > 1,
      adm: getRandomInt(2) > 1,
      path_photo: "unknown.png",
      rotas: routes.map(route => {
        return ({
            rota: route,
            verbo_get: faker.random.boolean(),
            verbo_put: faker.random.boolean(),
            verbo_patch: faker.random.boolean(),
            verbo_delete: faker.random.boolean(),
            verbo_post: faker.random.boolean()
        })
      })
    }
    usuariosArray.push(usuario)
  }

  await usuarios.insertMany(usuariosArray)
}

await generateUsuarios(20)

const getUsuarios = async () => {
  return await usuarios.find()
}

const generatePublicacoes = async (qtd) => {
  const users = await getUsuarios()
  const publicacoesArray = []

  for (let i = 0; i < qtd; i++) {
    const userId = users[Math.floor(Math.random() * usuarios.length)]
    const randNum = Math.random()

    const publicacao = {
      titulo: faker.lorem.sentence(),
      data: faker.date.past(),
      tipo: randNum <= 0.3 ? "Notícia" : randNum <= 0.6 ? "Projeto" : "Artigo",
      registro: faker.lorem.paragraphs(2),
      usuarioId: userId,
      tags: pick(4, generateTags())
    }

    publicacoesArray.push(publicacao)
  }

  await publicacoes.insertMany(publicacoesArray)
}

await generatePublicacoes(40)

await parceiros.deleteMany()

const generateParceiros = async (qtd) => {
  const parceirosArray = []

  for (let i = 0; i < qtd; i++) {
    const parceiro = {
      nome: faker.company.companyName(),
      ativo: faker.random.boolean(),
      caminho_logo: 'arb.png',
      descricao: faker.lorem.paragraphs()
    }

    parceirosArray.push(parceiro)
  }

  await parceiros.insertMany(parceirosArray)
}

await generateParceiros(10)


console.log("Dados inseridos!")

db.close((err) => err ? console.log(err) : console.log("Comunicação com o banco de dados encerrada!"))