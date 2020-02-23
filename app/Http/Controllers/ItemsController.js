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
  * show (request,response) {
    const item = yield Items.query().where('id',request.param('item_id')).firstOrFail()
    const time = Antl.formatDate(item.date_buy, { month:'numeric',day:'numeric',year:'numeric' })

    yield response.sendView('admin.item.show',{items:item.toJSON(),time:time } )
  }
  * edit (request,response) {
    const item = yield Items.query().where('id',request.param('item_id')).firstOrFail()
    const time = Antl.formatDate(item.date_buy, { month:'numeric',day:'numeric',year:'numeric' })
    yield response.sendView('admin.item.edit',{ items:item.toJSON(),time:time } )
    console.log(time);
  }
}

module.exports = ItemsController;
