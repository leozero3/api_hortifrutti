import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return {
    hortifrutti: 'pratico',
  }
})

Route.post('/login', 'AuthController.login')
Route.post('/logout', 'AuthController.login')
