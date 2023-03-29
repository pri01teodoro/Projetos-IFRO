import express from "express";
import ParceirosController from "../controllers/ParceirosController.js";
import authMiddleware from "../middlewares/AuthMidleware.js";

const router = express.Router();

/**
 * @swagger
 * #Rotas para parceiro
 * 
 *  /parceiros:
 *    get:
 *      parameters:
 *        - name: nome
 *          description: Filtra por parceiros cujo o nome contenha o parâmetro informado.
 *          in: query
 *          schema:
 *            type: string
 *          required: false
 *        - name: page
 *          description: Informa a página de início da listagem de parceiros
 *          in: query
 *          schema:
 *            type: int
 *          required: false
 *          default: 1
 *        - name: limit
 *          description: Informa o número máximo de parceiros na exibição.
 *          in: query
 *          schema:
 *            type: int
 *          required: false
 *          default: 5
 *      tags:
 *        - Parceiros
 *      summary: Recupera todos os parceiros
 *      responses:
 *        '200':
 *          description: "Sucesso"
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/parceiros'
 *        '404':
 *          description: "Parceiro não encontrado"
 *          content:
 *            application/json:
 *              example: Not Found
 *     
 *    post: 
 *      security: 
 *       - bearerAuth: []
 *      tags:
 *        - Parceiros
 *      summary: Cadastra um novo parceiro
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/parceiros'
 *      responses:
 *        '201':
 *          description: "Sucesso"
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/parceiros'
 *       
 *        '404':
 *          description: "Sem acesso ao banco"
 *          content:
 *            application/json:
 *              example: Not Found
 *       
 *        '409':
 *          description: "Parceiro já existente"
 *          content:
 *            application/json:
 *              example: Conflict
 *             
 *  /parceiros/{id}:
 *    parameters:
 *      - name: id
 *        in: path
 *        schema:
 *          type: integer
 *        required: true
 *    get:
 *      tags:
 *        - Parceiros
 *      summary: Recupera parceiro por ID
 *      responses:
 *        '200':
 *          description: Sucesso
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/parceiro'
 *        '404':
 *          description: Parceiro não encontrado
 *          content:
 *            application/json:
 *              example: Not Found
 * 
 *    put:
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - Parceiros
 *      summary: Atualiza um parceiro pelo ID
 *      requestBody:
 *        description: Atualiza um parceiro pelo ID
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/parceiro'
 *      responses:
 *        '200':
 *          description: Sucesso
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/parceiro'
 *               
 *        '404':
 *          description: Nenhum usuário encontrado
 *          content:
 *            application/json:
 *              example: Not Found
 * 
 *    patch:
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - Parceiros
 *      summary: Atualiza parcialmente um parceiro pelo ID
 *      requestBody:
 *        description: Atualiza parcialmente um parceiro pelo ID
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/parceiro'
 *      responses:
 *        '200':
 *          description: Sucesso
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/parceiro'
 *               
 *        '404':
 *          description: Nenhum usuário encontrado
 *          content:
 *            application/json:
 *              example: Not Found
 * 
 *    delete:
 *      security: 
 *        - bearerAuth: []
 *      tags:
 *        - Parceiros
 *      summary: Apaga um parceiro pelo ID
 *      responses:
 *        '200':
 *          description: Sucesso
 *          content:
 *            application/json:
 *              example: Deleted
 *               
 *        '404':
 *          description: Nenhum parceiro encontrado
 *          content:
 *            application/json:
 *              example: Not Found
 * 
 */
 
 // por algum motivo fazendo dessa maneira e nao quebrando o router e diferentes funções
// faz com que uma função de mesmo nome e de mesmo método sobreponha a mesma
// nao consigo chamar a função /parceiros no qual lista por nomes
// e a parceiros que lista todos, pois uma sobrepõe a outra
// por isso mudei o nome para parceirosbyName

// tudo funcionando :)
router
    .get("/parceiros", ParceirosController.listarParceiros)
    .get("/parceiros/:id", ParceirosController.listarParceiroPorId)
    .post("/parceiros", authMiddleware, ParceirosController.cadastrarParceiro)
    .put("/parceiros/:id", authMiddleware, ParceirosController.atualizarParceiro)
    .delete("/parceiros/:id", authMiddleware, ParceirosController.excluirParceiro)
    .patch("/parceiros/:id", authMiddleware, ParceirosController.atualizarParceiro)

export default router;