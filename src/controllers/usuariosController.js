const bcrypt = require("bcrypt");
const { Usuario } = require("../models");

const usuarioController = {
  async store(req, res) {
    try {
      const { nome, email, senha, cargo } = req.body;

      if (!nome || !email || !senha) {
        return res
          .status(400)
          .json({ error: "Os campos nome, email e senha são obrigatórios." });
      }
      
      const usuarioExistente = await Usuario.findOne({ where: { email } });

      if (usuarioExistente) {
        return res.status(400).json({ erro: "Este e-mail já está em uso." });
      }

      const senha_hash = await bcrypt.hash(senha, 10);

      const novoUsuario = await Usuario.create({
        nome,
        email,
        senha_hash,
        cargo: cargo || "membro",
      });

      return res.status(201).json({
        mensagem: "Usuario cadastrado com sucesso!",
        usuario: novoUsuario,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ erro: "Erro ao cadastrar usuário." });
    }
  },
};

module.exports = usuarioController;