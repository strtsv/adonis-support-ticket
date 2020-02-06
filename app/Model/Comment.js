'use strict'

const Lucid = use('Lucid')

class Comment extends Lucid {
  ticket() {
    return this.belongsTo('App/Model/Ticket')
  }
  user() {
    return this.belongsTo('App/Model/User')
  }
}

module.exports = Comment
