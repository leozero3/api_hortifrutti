import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return {
    hortifrutti: 'pratico',
  }
})

Route.post('/login', 'AuthController.login')
Route.post('/logout', 'AuthController.logout')

Route.group(() => {
  Route.get('/auth/me', 'AuthController.me')
}).middleware('auth')
