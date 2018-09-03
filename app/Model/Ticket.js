'use strict'

const Lucid = use('Lucid')

class Ticket extends Lucid {
  category() {
    return this.belongsTo('App/Model/Category')
  }
  comments() {
    return this.hasMany('App/Model/Comment')
  }
  user() {
    return this.belongsTo('App/Model/User')
  }
}

module.exports = Ticket
