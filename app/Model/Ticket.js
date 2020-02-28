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
  item() {
      return this.belongsTo('App/Model/Item','id','id_item')
  }
  updated() {
    return this.belongsTo('App/Model/User','id','updated_by' )
  }
}

module.exports = Ticket
