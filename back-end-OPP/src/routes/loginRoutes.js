import express from "express";
import LoginController from "../controllers/LoginController.js";

const router = express.Router();

/**
 * @swagger
 * /login:
 *   post:
 *      tags:
 *        - Login
 *      summary: Faz login na plataforma
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/login'
 *      responses:
 *        '200':
 *          description: "Sucesso"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  user:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: string
 *                      nome:
 *                        type: string
 *                      email:
 *                        type: string
 *                      ativo:
 *                        type: boolean
 *                      formacao:
 *                        type: array
 *                        items: {
 *                          $ref: '#/components/schemas/formacao'
 *                        }
 *                      path_photo:
 *                        type: string
 *                  token:
 *                    type: string
 *       
 *        '400':
 *          description: "Não foi possível logar"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 */

router
  .post("/login", LoginController.logar)

export default router;