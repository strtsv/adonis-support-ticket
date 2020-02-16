"use strict";

const Department = use("App/Model/Department");
const Validator = use("Validator");

class DepartmentsController {
  *index(request, response) {
    const depart = yield Department.all();
    yield response.sendView("departments.index", {
      departments: depart.toJSON()
    });
  }
  *create(request, response) {
    yield response.sendView("departments.create");
  }
  *store(request, response) {
    const validation = yield Validator.validateAll(request.all(), {
      name: "required"
    });
    if (validation.fails()) {
      yield request
        .withAll()
        .andWith({ errors: validation.messages() })
        .flash();
      return response.redirect("back");
    }
    const depart = yield Department.create({
      name: request.input("name")
    });
    yield request.with({ status: `Success create new Department.` }).flash();
    response.redirect("/departments");
  }
}

module.exports = DepartmentsController;
