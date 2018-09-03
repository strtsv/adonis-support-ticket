'use strict'

// const Mail = use('Mail')
const Validator = use('Validator')
const Ticket = use('App/Model/Ticket')
const RandomString = use('randomstring')
const Category = use('App/Model/Category')

class TicketsController {
  * index(request, response) {
    const tickets = yield Ticket.all()
    const categories = yield Category.all()

    yield response.sendView('tickets.index', { tickets: tickets.toJSON(), categories: categories.toJSON() })
  }
}

module.exports = TicketsController
