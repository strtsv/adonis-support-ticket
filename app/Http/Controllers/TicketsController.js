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
  * create(request, response) {
    const categories = yield Category.pair('id', 'name')

    yield response.sendView('tickets.create', {categories: categories})
  }
  * store(request, response) {
    const user = request.currentUser
    const validation = yield Validator.validateAll(request.all(), {
        title: 'required',
        category: 'required',
        priority: 'required',
        message: 'required'
    })
    if (validation.fails()) {
        yield request
            .withAll()
            .andWith({ errors: validation.messages() })
            .flash()

        return response.redirect('back')
    }
    const ticket = yield Ticket.create({
        title: request.input('title'),
        user_id: user.id,
        ticket_id: RandomString.generate({ length: 10, capitalization: 'uppercase' }),
        category_id: request.input('category'),
        priority: request.input('priority'),
        message: request.input('message'),
        status: "Open",
    })
    yield request.with({ status: `A ticket with ID: #${ticket.ticket_id} has been opened.` }).flash()
    response.redirect('back')
  }
}

module.exports = TicketsController
