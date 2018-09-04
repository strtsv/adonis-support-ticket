'use strict'

const Schema = use('Schema')

class AddIsadminToUsersSchema extends Schema {
  up () {
    this.table('users', (table) => {
      table.integer('is_admin').unsigned().default(0);
    })
  }

  down () {
    this.table('users', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AddIsadminToUsersSchema
