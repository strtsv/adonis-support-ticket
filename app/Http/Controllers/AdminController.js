"use strict";
const Database = use("Database");
const Validator = use("Validator");
const Antl = use("Antl");
const User = use("App/Model/User");
const departemens = use("App/Model/Department");
const Category = use("App/Model/Category");
const Ticket = use("App/Model/Ticket");

class AdminController {
  *index(request, response) {
    const user = yield User.query().whereNotIn("is_admin", [1]);
    console.log(user);
    const depart = yield departemens.all();
    yield response.sendView("user.index", {
      user: user,
      departemens: depart.toJSON()
    });
  }
  *addUser(request, response) {
    const depart = yield departemens.pair("id", "name");
    yield response.sendView("user.add", { departemens: depart });
  }
  *store(request, response) {
    const validation = yield Validator.validateAll(request.all(), User.rules);
    if (validation.fails()) {
      yield request
        .withAll()
        .andWith({ errors: validation.messages() })
        .flash();
      return response.redirect("back");
    }
    yield User.create({
      username: request.input("username"),
      email: request.input("email"),
      password: request.input("password"),
      is_admin: request.input("position"),
      departemen_id: request.input("departemens")
    });
    response.redirect("/user");
  }
}

module.exports = AdminController
