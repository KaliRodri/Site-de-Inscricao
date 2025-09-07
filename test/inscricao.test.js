const request = require("supertest");
const app = require("../src/server");

const { Inscricao } = require('../src/models');

beforeEach(async () => {
  await Inscricao.destroy({ where: {}, truncate: true });
});

describe("CRUD de Inscrições", () => {
  it("POST /inscricoes/:id deve criar inscrição", async () => {
    const eventoId = 1; // ID do evento criado
    const inscricao = { nome: "Rodrigo", email: "rodrigo@example.com", curso: "Engenharia" };
    const res = await request(app).post(`/inscricoes/${eventoId}`).send(inscricao);

    expect(res.statusCode).toBe(201);
    expect(res.body.inscricao.nome).toBe("Rodrigo");
    expect(Number(res.body.inscricao.evento_id)).toBe(eventoId);


  });
});
