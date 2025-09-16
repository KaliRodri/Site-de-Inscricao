const express = require("express");
const router = express.Router();
const eventoController = require("../controllers/eventosController");
const InscricaoController = require('../controllers/inscricoesController');
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

// Inscrições
routes.post('/:id/inscricoes', InscricaoController.store);
routes.get('/:id/inscricoes', authMiddleware, InscricaoController.index);
routes.get('/:id/inscricoes/export', authMiddleware, InscricaoController.exportCsv);

module.exports = router;
