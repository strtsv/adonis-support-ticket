'use strict'

const User = use('App/Model/User')
const Validator = use('Validator')

class AuthController {
	* showLoginPage(request, response) {
		yield response.sendView('auth.login')
	}

	* login(request, response) {
		const email = request.input('email')
		const password = request.input('password')

		try {
			yield request.auth.attempt(email, password)

			// redirect to homepage
			response.redirect('/')
		} catch (e) {
			yield request.with({ error: 'Invalid credentails' }).flash()

			// redirect back with error
			response.redirect('back')
		}
	}

	* showRegisterPage(request, response) {
		yield response.sendView('auth.register')
	}

	* register(request, response) {
		// validate form input
		const validation = yield Validator.validateAll(request.all(), User.rules)

		// show error messages upon validation fail
		if (validation.fails()) {
			yield request
				.withAll()
				.andWith({ errors: validation.messages() })
				.flash()

			return response.redirect('back')
		}

		// persist to database
		const user = yield User.create({
			username: request.input('username'),
			email: request.input('email'),
			password: request.input('password')
		})

		// login the user
		yield request.auth.login(user)

		// redirect to homepage
		response.redirect('/')
	}

	* logout(request, response) {
		yield request.auth.logout()
		response.redirect('/login')
	}
}

module.exports = AuthController
