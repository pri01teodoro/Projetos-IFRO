import request from "supertest"
import app from "../src/app"
import {expect, jest, test} from '@jest/globals';

// describe aggroup test
describe('test my app server', () => {
    it("should get the parceiros", async () => {
        const res = await request(app).get('/parceiros')
        expect(res.body.docs).toEqual(
            expect.arrayContaining([{
                _id: expect.any(String),
                nome: expect.any(String),
                ativo: expect.any(Boolean),
                caminho_logo: expect.any(String),
                descricao: expect.any(String),
                __v: expect.any(Number)
            }])
        )
    })
})