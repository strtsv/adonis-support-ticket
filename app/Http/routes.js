'use strict'

const Route = use('Route')

Route.on('/').render('welcome')
Route.get('register', 'AuthController.showRegisterPage')
Route.post('register', 'AuthController.register')
Route.get('login', 'AuthController.showLoginPage')
Route.post('login', 'AuthController.login')
Route.get('logout', 'AuthController.logout')
Route.get('tickets', 'TicketsController.index').middleware('auth')
Route.get('my_tickets', 'TicketsController.index')