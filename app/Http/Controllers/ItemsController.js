"use strict";
const Items = use("App/Model/Item");
const Category = use("App/Model/Category");
const Validator = use("Validator");
const Antl = use("Antl");

class ItemsController {
  *index(request, response) {
    const item = yield Items.all();
    const category = yield Category.all();
    yield response.sendView("items.index", {
      items: item.toJSON(),
      category: category.toJSON()
    });
  }
  *create(request, response) {
    yield response.sendView("items.create");
  }
  *show(request, response) {
    const item = yield Items.query()
      .where("id", request.param("item_id"))
      .firstOrFail();
    yield response.sendView("items.show", { items: item.toJSON() });
  }
  *edit(request, response) {
    const item = yield Items.query()
      .where("id", request.param("item_id"))
      .firstOrFail();
    yield response.sendView("items.edit", {
      items: item.toJSON()
    });
    console.log(time);
  }
  *update(request, response) {
    const user = request.currentUser;
    const validation = yield Validator.validateAll(request.all(), {
      code: "required",
      name: "required",
      desc: "required",
      room: "required",
      vendor: "required",
      notes: "required",
      datebuy: "required",
      expired: "required"
    });
    if (validation.fails()) {
      yield request
        .withAll()
        .andWith({ errors: validation.messages() })
        .flash();
      return response.redirect("back");
    }
    const post = yield Items.findBy("id", request.input("id"));
    console.log(request.input("code"));
    post.code = request.input("code");
    post.name = request.input("name");
    post.desc = request.input("desc");
    post.room = request.input("room");
    post.vendor = request.input("vendor");
    post.notes = request.input("notes");
    post.date_buy = request.input("datebuy");
    post.expired = request.input("expired");
    yield post.save();
    console.log(request.input("code"));
    yield request.with({ status: `A Items is update .` }).flash();
    response.redirect("/items");
  }
  *destroy(request, response) {}
  *store(request, response) {
    const user = request.currentUser;
    const validation = yield Validator.validateAll(request.all(), {
      code: "required",
      name: "required",
      desc: "required",
      room: "required",
      vendor: "required",
      notes: "required",
      datebuy: "required",
      expired: "required"
    });
    const items = yield Items.create({
      code: request.input("code"),
      name: request.input("name"),
      desc: request.input("desc"),
      room: request.input("room"),
      vendor: request.input("vendor"),
      notes: request.input("notes"),
      date_buy: request.input("datebuy"),
      expired: request.input("expired")
    });
    if (validation.fails()) {
      yield request
        .withAll()
        .andWith({ errors: validation.messages() })
        .flash();
      return response.redirect("back");
    }
    yield request.with({ status: `A Items is Created .` }).flash();
    response.redirect("/items");
  }
}

module.exports = ItemsController;
