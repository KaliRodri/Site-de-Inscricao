const { Evento } = require("../models");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async criarEvento(req, res) {
    try {
      const { titulo, descricao, closing_date } = req.body;

      if (!titulo) {
        return res.status(400).json({ erro: "O campo 'titulo' é obrigatório." });
      }

      if (!closing_date) {
        return res.status(400).json({ erro: "O campo 'closing_date' é obrigatório." });
      }

      const link_slug = `${titulo.toLowerCase().replace(/\s+/g, "-")}-${uuidv4().slice(0, 6)}`;

      const evento = await Evento.create({
        titulo,
        descricao,
        closing_date,
        link_slug,
        status: "ativo"
      });

      return res.status(201).json({
        mensagem: "Evento criado com sucesso!",
        evento,
        link_publico: `/eventos/${evento.link_slug}`
      });

    } catch (error) {
      console.error("Erro ao criar evento:", error);
      return res.status(500).json({ erro: "Erro interno no servidor" });
    }
  }
};