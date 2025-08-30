const { Router } = require('express');
const usuariosController = require('../controllers/usuariosController');
const routes = Router();

routes.post ('/', usuariosController.store);

module.exports = routes;