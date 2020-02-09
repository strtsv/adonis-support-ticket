'use strict'

const Category = use ('App/Model/Category')

class CategoriesController {
  /**
   * Display all tickets.
   */
  * index(request, response) {
    const categories = yield Category.all()

    yield response.sendView('admin.category.index', { categories: categories.toJSON() })
  }
}

module.exports = CategoriesController
