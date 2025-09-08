const express = require("express");
const router = express.Router();
const eventoController = require("../controllers/eventosController");
const authMiddleware = require("../middlewares/authMiddleware");

// Criar evento
router.post("/eventos", eventoController.criarEvento);

// Listar eventos
router.get("/eventos", eventoController.listarEventos);

// Detalhes de um evento
router.get("/eventos/:id", eventoController.detalhesEvento);

// Editar evento
router.put("/eventos/:id", authMiddleware, eventoController.editarEvento);

// Deletar evento
router.delete("/eventos/:id", authMiddleware, eventoController.deletarEvento);

module.exports = router;
