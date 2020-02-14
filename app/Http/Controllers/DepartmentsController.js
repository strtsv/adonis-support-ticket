"use strict";

const Department = use("App/Model/Department");
const Validator = use("Validator");

class DepartmentsController {
  *index(response) {
    departments = yield Department.all();
    yield response.sendView("departments.index", {
      departments: depart.toJSON()
    });
  }
  *create(response) {
    yield response.sendView("departments.create");
  }
  *store(response) {
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
    const depart = yield departments.create({
      name: request.input("name")
    });
    yield request.with({ status: `Success create new Department.` }).flash();
    response.redirect("/department");
  }
}

module.exports = DepartmentsController;
