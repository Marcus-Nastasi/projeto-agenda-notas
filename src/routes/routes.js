const express = require('express');
const routes = express.Router();
const homeController = require('../controllers/homeController');
const loginController = require('../controllers/loginController');
const errController = require('../controllers/errController');

// Rotas da Home
routes.get('/', homeController.index);

// Rotas de get pagina Login
routes.get('/login', loginController.index);

// Rota de registro user
routes.post('/login/register', loginController.register);

// Rota para logar os usuários
routes.post('/login/user', loginController.user);

// Rota erro 404
routes.get('/404', errController.pgErro);

module.exports = routes;

