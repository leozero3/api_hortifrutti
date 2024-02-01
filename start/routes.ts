import { HttpContext } from '@adonisjs/http-server/build/src/HttpContext'
import Route from '@ioc:Adonis/Core/Route'
import User from 'App/Models/User'

Route.get('/', async () => {
  User.create({
    email: 'admin@admin.com',
    password: '123456',
    tipo: 'admin',
  })
})

Route.post('/getToken', async ({ request, response, auth }: HttpContext) => {
  const email = request.input('email')
  const password = request.input('password')

  const user = await User.findBy('email', email)

  if (user === null) {
    return response.notFound('Usuario não encontrado')
  }

  const token = await auth.use('api').attempt(email, password)

  return response.ok(token)
})
