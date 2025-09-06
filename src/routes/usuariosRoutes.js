const { Router } = require('express');
const usuariosController = require('../controllers/usuariosController');
const routes = Router();
const authMiddleware = require("../middlewares/authMiddleware")

routes.post ('/', usuariosController.store);
routes.post('/login', usuariosController.login);
routes.get('/me', authMiddleware, usuariosController.show);

module.exports = routes;