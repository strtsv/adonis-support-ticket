"use strict";
const Database = use("Database");
const Validator = use("Validator");
const User = use("App/Model/User");
const departemens = use("App/Model/Department");
const Category = use("App/Model/Category");
const Ticket = use("App/Model/Ticket");

class AdminController {
  *index(request, response) {
    const user = yield User.query().whereNotIn("is_admin", [1]);
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
    response.redirect("/users");
  }
  *report(request, response) {
    var Tiket;
    var req = request.get();
    var start = req.start;
    var end = req.end;
    if (start != null) {
      Tiket = yield Database.from(
        "tickets"
      ).whereRaw("date(created_at) between ? and ?", [start, end]);
      console.log(Tiket);
    } else {
      start = null;
      end = null;
      const Tiket2 = yield Ticket.all();
      Tiket = Tiket2.toJSON();
    }
    const categories = yield Category.all();
    const user = yield User.all();
    yield response.sendView("report.index", {
      tickets: Tiket,
      start: start,
      end: end,
      categories: categories.toJSON(),
      user: user.toJSON()
    });
  }
  *postreport(request, response) {
    const Tiket = yield Ticket.all();
    yield response.sendView("report.index", {
      tickets: Tiket.toJSON()
    });
  }
  *reportdetail(request, response) {
    const ticket = yield Ticket.query()
      .where("ticket_id", request.param("ticket_id"))
      .with("user")
      .firstOrFail();
    const comments = yield ticket
      .comments()
      .with("user")
      .fetch();
    const category = yield Category.pair("id", "name");
    const Category_ticket = yield ticket.category().fetch();
    yield response.sendView("report.detail", {
      ticket: ticket.toJSON(),
      comments: comments.toJSON(),
      category: category,
      category_ticket: Category_ticket
    });
  }
}

module.exports = AdminController;
