"use strict";
const Items = use("App/Model/Item");
const Category = use("App/Model/Category");

class ItemsController {
  *index(request, response) {
    const item = yield Items.all();
    const category = yield Category.all();
    yield response.sendView("items.index", {
      items: item.toJSON(),
      category: category.toJSON()
    });
  }
  * create (request,response) {
    yield response.sendView('item.create')
  }
}

module.exports = ItemsController;
