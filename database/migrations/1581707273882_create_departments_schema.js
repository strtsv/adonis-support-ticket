'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateDepartmentsSchema extends Schema {
  up () {
    this.create('departments', (table) => {
      table.increments()
      table.string('name').notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('departments')
  }
}

module.exports = CreateDepartmentsSchema
