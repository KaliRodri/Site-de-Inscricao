const { Router } = require('express');
const inscricoesController = require('../controllers/inscricoesController');
const routes = Router();

routes.post ('/', inscricoesController.store);

module.exports = routes;