const { Router } = require('express');
const inscricoesController = require('../controllers/inscricoesController');
const routes = Router();

// POST /inscricoes/:id
routes.post('/:id', inscricoesController.store);

module.exports = routes;
