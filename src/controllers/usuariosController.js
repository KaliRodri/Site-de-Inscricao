const bcrypt = require("bcrypt");
const { Usuario } = require("../models");
const validator = require("validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const usuarioController = {
  async store(req, res) {
    try {
      const { nome, email, senha, cargo } = req.body;

      if (!nome || !email || !senha) {
        return res
          .status(400)
          .json({ error: "Os campos nome, email e senha são obrigatórios." });
      }

      if (!validator.isEmail(email)) {
        return res.status(400).json({ error: "Email inválido." });
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

  async login(req, res) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res
          .status(400)
          .json({ error: "Email e senha são obrigatórios." });
      }
      const usuario = await Usuario.findOne({ where: { email } });
      if (!usuario)
        return res.status(404).json({ error: "Usuário não encontrado." });

      const senhaValida = await bcrypt.compare(senha.trim(), usuario.senha_hash);

      if (!senhaValida)
        return res.status(401).json({ error: "Senha incorreta." });
      const token = jwt.sign(
        {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          cargo: usuario.cargo,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      return res.json({
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          cargo: usuario.cargo,
        },
        token,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error ao fazer login." });
    }
  },

  async show(req, res) {
    try {
      const usuario = await Usuario.findByPk(req.userId, {
        attributes: ["id", "nome", "email", "cargo"],
      });

      if (!usuario) {
        return res.status(404).json({ error: "Usuario não encontrado." });
      }

      return res.json(usuario);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error ao buscar usuário." });
    }
  },
};

module.exports = usuarioController;
