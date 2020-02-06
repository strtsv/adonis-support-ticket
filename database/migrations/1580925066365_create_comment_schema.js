'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateCommentSchema extends Schema {
  up () {
    this.create('comments', (table) => {
        table.increments()
        table.integer('ticket_id').unsigned()
        table.integer('user_id').unsigned()
        table.text('comment')
        table.timestamps()
    })
  }

  down () {
    this.drop('comments')
  }
}

module.exports = CreateCommentSchema
