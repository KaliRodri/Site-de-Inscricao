const express = require("express");
const router = express.Router();
const eventoController = require("../controllers/eventosController");
const authMiddleware = require("../middlewares/authMiddleware");


router.post("/eventos", eventoController.criarEvento);

router.delete("/eventos/:id", authMiddleware, eventoController.deletarEvento);

module.exports = router;