'use strict'

const Schema = use('Schema')

class CreateItemsTableSchema extends Schema {

  up () {
    this.create('items', (table) => {
        table.increments()
        table.text('code')
        table.string('name').notNullable().unique()
        table.text('desc')
        table.string('room')
        table.string('vendor')
        table.text('notes')
        table.timestamp('date_buy')
        table.timestamp('expired')
        table.timestamps()
    })
  }

  down () {
    this.table('items', (table) => {
      this.drop('items')
    })
  }

}

module.exports = CreateItemsTableSchema
