import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/models/user'

export default class AuthController {
  public async login({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const user = await User.findByOrFail('email', email)

      let expira

      switch (user.tipo) {
        case 'clientes':
          expira = '30days'
          break
        case 'estabelecimentos':
          expira = '7days'
          break
        case 'admins':
          expira = '1day'
          break

        default:
          expira = '30days'
          break
      }

      const token = await auth
        .use('api')
        .attempt(email, password, { expiresIn: expira, name: user.serialize().email })

      response.ok(token)
    } catch (error) {
      return response.badRequest('Invalid credentials')
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    try {
      await auth.use('api').revoke()
    } catch (error) {
      return response.unauthorized('You are not logged in')
    }
  }
}
