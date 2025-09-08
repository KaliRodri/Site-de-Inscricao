const { Evento, Inscricao } = require("../models");
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
  },

  async listarEventos(req, res) {
    try {
      const eventos = await Evento.findAll({
        attributes: [
          "id",
          "titulo",
          "descricao",
          "link_slug",
          "status",
          "closing_date"
        ],
        where: { status: "ativo" } // só retorna eventos ativos
      });

      return res.json(eventos);
    } catch (error) {
      console.error("Erro ao listar eventos:", error);
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  },

  async detalhesEvento(req, res) {
    try {
      const { id } = req.params;

      const evento = await Evento.findByPk(id);
      if (!evento) {
        return res.status(404).json({ error: "Evento não encontrado" });
      }

      return res.json(evento);
    } catch (error) {
      console.error("Erro ao buscar detalhes do evento:", error);
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  },

  async editarEvento(req, res) {
    try {
      const { id } = req.params;
      const { titulo, descricao, closing_date } = req.body;

      const evento = await Evento.findByPk(id);
      if (!evento) {
        return res.status(404).json({ error: "Evento não encontrado" });
      }

      if (titulo) evento.titulo = titulo;
      if (descricao) evento.descricao = descricao;
      if (closing_date) evento.closing_date = closing_date;

      await evento.save();

      return res.json({
        message: "Evento atualizado com sucesso",
        evento
      });
    } catch (error) {
      console.error("Erro ao editar evento:", error);
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  },

  async deletarEvento(req, res) {
    try {
      const { id } = req.params;

      const evento = await Evento.findByPk(id);
      if (!evento) {
        return res.status(404).json({ error: "Evento não encontrado" });
      }

      await Inscricao.destroy({ where: { evento_id: id } });
      await evento.destroy();

      return res.json({ message: "Evento deletado com sucesso" });
    } catch (error) {
      console.error("Erro ao deletar evento:", error);
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
};
