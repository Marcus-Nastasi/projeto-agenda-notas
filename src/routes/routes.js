const express = require('express');
const routes = express.Router();
const homeController = require('../controllers/homeController');
const loginController = require('../controllers/loginController');
const errController = require('../controllers/errController');
const taskController = require('../controllers/taskController');

// Rotas da Home
routes.get('/', homeController.index);

// Rotas de get pagina Login
routes.get('/login', loginController.index);

// Rota de registro user
routes.post('/login/register', loginController.register);

// Rota para logar os usuários
routes.post('/login/user', loginController.logUser);

// logout user
routes.get('/login/logout', loginController.logout);

// Rota erro 404
routes.get('/404', errController.pgErro);

// Rotas de cadastro de tasks
routes.post('/task/create', taskController.createTask);

module.exports = routes;

