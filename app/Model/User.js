'use strict'

const Lucid = use('Lucid')
const Hash = use('Hash')

class User extends Lucid {

  static boot () {
    super.boot()

    this.addHook('beforeCreate', function * (next) {
      this.password = yield Hash.make(this.password)
      yield next
    })
  }

  apiTokens () {
    return this.hasMany('App/Model/Token')
  }

 static get rules() {
   return {
        username: 'required|unique:users',
        email: 'required|email|unique:users',
        password: 'required|confirmed|min:6'
   }
 }

}

module.exports = User
