const express = require("express");
const router = express.Router();
const eventoController = require("../controllers/eventoController");

router.post("/eventos", eventoController.criarEvento);

module.exports = router;