const request = require("supertest");
const app = require("../src/app");
const { sequelize, Evento } = require("../src/models");

beforeAll(async () => {
  // Conecta ao banco de dados de teste
  await sequelize.authenticate();
});

afterAll(async () => {
  // Fecha a conexão depois dos testes
  await sequelize.close();
});

describe("Testando rota de criação de eventos", () => {
  it("Deve criar um evento com sucesso", async () => {
    const novoEvento = {
      titulo: "Evento Teste",
      descricao: "Descrição do evento teste",
      link_slug: "evento-teste",
      closing_date: "2025-12-31",
      status: "ativo",
    };

    const res = await request(app)
      .post("/eventos")
      .send(novoEvento);

    expect(res.statusCode).toBe(201);
    expect(res.body.evento).toHaveProperty("id");
    expect(res.body.evento.titulo).toBe(novoEvento.titulo);
    
  });
});
