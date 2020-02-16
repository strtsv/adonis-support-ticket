'use strict'

const Category = use ('App/Model/Category')
const Validator = use('Validator')

class CategoriesController {

  * index(request, response) {
    const categories = yield Category.all()

    yield response.sendView('category.index', { categories: categories.toJSON() })
  }

  * add(request,response) {
    yield response.sendView('category.add')
  }

  * store(request,response) {
    const user = request.currentUser
    const name = request.input('name')

    // validate form input
    const validation = yield Validator.validateAll(request.all(), {
        name: 'required'

    })

    // show error messages upon validation fail
    if (validation.fails()) {
        yield request
            .withAll()
            .andWith({ errors: validation.messages() })
            .flash()

        return response.redirect('back')
    }

    // persist ticket to database
    const category = yield Category.create({
        name: request.input('name'),

    })

    console.log(`user is ${user.email} and name is ${name}`);

    yield request.with({ status: `A ticket with ID: has been opened.` }).flash()
    response.redirect('/categories')
  }
}

module.exports = CategoriesController
