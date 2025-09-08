const express = require("express");
const router = express.Router();
const eventoController = require("../controllers/eventosController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/eventos", eventoController.criarEvento);

router.get("/eventos", eventoController.listarEventos);

module.exports = router;