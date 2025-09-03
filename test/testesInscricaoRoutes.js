const {Router} = require('express');
const InscricaoController = require('../src/controllers/inscricoesController');
const authMiddleware = require('../src/middlewares/authMiddleware');
const routes = new Router();

routes.post('/:id/inscricoes', InscricaoController.store);
routes.get('/:id/inscricoes', authMiddleware, InscricaoController.index);
routes.get('/:id/inscricoes/export', authMiddleware, InscricaoController.exportCsv);
module.exports = routes;


// Linhas a serem adicionadas no arquivo src/routes/eventoRoutes.js

//const InscricaoController = require('../controllers/InscricaoController');
//const authMiddleware = require('../middlewares/auth');

// Adicionar esta rota junto com as outras de eventos
//routes.get('/:id/inscricoes', authMiddleware, InscricaoController.index);