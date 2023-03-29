import express from "express";
import UsuarioController from "../controllers/UsuarioController.js";
//import usuarios from "../models/Usuario.js";
import authMiddleware from "../middlewares/AuthMidleware.js";

const router = express.Router();

/**
 * @swagger
 * #Rotas para usuário
 * /usuarios:
 *   get:
 *     parameters:
 *      - name: ativo
 *        description: Filtra por usuários cujo ativo seja igual ao informado. É true por padrão. Se não for nem true nem false, retorna todos os tipos de ativo.
 *        in: query
 *        schema: 
 *          type: boolean
 *        required: false
 *      - name: nome
 *        description: Filtra por usuários cujo o nome contenha o parâmetro informado.
 *        in: query
 *        schema:
 *          type: string
 *        required: false
 *      - name: email
 *        description: Filtra por usuários cujo o email do login contenha o parâmetro informado.
 *        in: query
 *        schema:
 *          type: string
 *        required: false
 *      - name: tituloFormacao
 *        description: Filtra por usuários cujo o titulo da formação contenha o parâmetro informado.
 *        in: query
 *        schema:
 *          type: string
 *        required: false
 *      - name: cursoFormacao
 *        description: Filtra por usuários cujo o curso da formação contenha o parâmetro informado.
 *        in: query
 *        schema:
 *          type: string
 *        required: false
 *      - name: page
 *        description: Informa a página de início da listagem de parceiros
 *        in: query
 *        schema:
 *          type: int
 *        required: false
 *        default: 1
 *      - name: limit
 *        description: Informa o número máximo de parceiros na exibição.
 *        in: query
 *        schema:
 *          type: int
 *        required: false
 *        default: 10
 * 
 *     tags:
 *       - Usuários
 *     summary: Recupera todos os usuários
 *     responses:
 *       '200':
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/usuarios'
 *               
 *       '404':
 *         description: Nenhum usuário encontrado
 *         content:
 *           application/json:
 *             example: Not Found
 *   post:
 *     tags:
 *       - Usuários
 *     summary: Cadastra um novo usuário
 *     requestBody: 
 *       content: 
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/usuario'  
 *               
 *     responses: 
 *       '201':
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/usuarios'
 *       '404':
 *         description: Sem acesso ao banco
 *         content:
 *           application/json:
 *             example: Not Found
 *       '409':
 *         description: Usuário já existente
 *         content:
 *           application/json:
 *             example: Conflict
 *             
 * /usuarios/{id}:
 *   parameters:
 *     - name: id
 *       in: path
 *       schema: 
 *         type: string
 *       required: true
 *   get:
 *     tags:
 *       - Usuários
 *     summary: Recupera um usuário por ID
 *     responses:
 *       '200':
 *         description: Sucesso
 *         content:
 *           application/json: 
 *             schema:
 *               $ref: '#/components/schemas/usuario'
 *                
 *       '204':
 *         description: "Sem alteração"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/usuario'
 * 
 *       '404':
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             example: Not Found
 * 
 *   put:
 *     security: 
 *       - bearerAuth: []
 *     tags:
 *       - Usuários
 *     summary: Atualiza um usuário pelo ID (todos os campos)
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/usuario'
 *     responses:
 *       '200':
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/usuario'
 *                
 *       '204':
 *         description: "Sem alteração"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/usuario'
 *               
 *       '404':
 *         description: Nenhum usuário encontrado
 *         content:
 *           application/json:
 *             example: Not Found
 *   patch:
 *     security: 
 *       - bearerAuth: []
 *     tags:
 *       - Usuários
 *     summary: Atualiza um usuário pelo ID (Um ou vários campos)
 *     requestBody: 
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/usuario'
 *     responses:
 *       '200':
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/usuario'
 *               
 *       '404':
 *         description: Nenhum usuário encontrado
 *         content:
 *           application/json:
 *             example: Not Found
 *   delete:
 *     security: 
 *       - bearerAuth: []
 *     tags:
 *       - Usuários
 *     summary: Apaga um usuário pelo ID
 *     responses:
 *       '200':
 *         description: Sucesso
 *         content:
 *           application/json:
 *             example: Deleted
 *               
 *       '404':
 *         description: Nenhum usuário encontrado
 *         content:
 *           application/json:
 *             example: Not Found
 *    
 */

router
  .get("/usuarios", UsuarioController.listarUsuarios)
  .get("/usuarios/:id", UsuarioController.listarUsuarioPorId)
  .post("/usuarios",  UsuarioController.cadastrarUsuario)
  .put("/usuarios/:id", authMiddleware, UsuarioController.atualizarUsuario)
  .delete("/usuarios/:id", authMiddleware, UsuarioController.excluirUsuario)
  .patch("/usuarios/:id", authMiddleware, UsuarioController.atualizarUsuario)

/* A comment. */
export default router;