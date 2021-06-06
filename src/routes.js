const LoginControllers = require('./app/Controller/LoginControllers')
const AuthMiddleware = require('./app/Middlewares/AuthMiddleware')
const Controllers = require('./app/Controller/Controllers')
const { Router } = require('express')
const routes = new Router()

routes.post('/users', Controllers.store)
routes.get('/users', AuthMiddleware, Controllers.show) // para controlar por autenticação
routes.post('/login', LoginControllers.index)

module.exports = routes