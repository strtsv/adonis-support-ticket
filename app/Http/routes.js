'use strict'

const Route = use('Route')

Route.on('/').render('welcome')
Route.get('register', 'AuthController.showRegisterPage')
Route.post('register', 'AuthController.register')
Route.get('login', 'AuthController.showLoginPage')
Route.post('login', 'AuthController.login')
Route.get('logout', 'AuthController.logout')
Route.post('comment', 'CommentsController.postComment')
Route.get('category','CategoriesController.index')
Route.get('category/add','CategoriesController.add')
Route.post('category','CategoriesController.store')
Route.get('my_tickets', 'TicketsController.index').middleware('auth')
Route.get('new_ticket', 'TicketsController.create').middleware('auth')
Route.post('new_ticket', 'TicketsController.store').middleware('auth')
Route.get('tickets/:ticket_id', 'TicketsController.show').middleware('auth')
Route.group('admin', function () {
  Route.get('tickets', 'TicketsController.index');
  Route.post('close_ticket/:ticket_id', 'TicketsController.close');
}).prefix('admin').middleware(['auth', 'admin'])
