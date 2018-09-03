'use strict'

const Lucid = use('Lucid')

class Category extends Lucid {
  tickets () {
    return this.hasMany('App/Model/Ticket')
  }
}

module.exports = Category
