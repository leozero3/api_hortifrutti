import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Admin from 'App/models/Admin'
import User from 'App/models/user'

export default class extends BaseSeeder {
  public async run() {
    const usuario = await User.create({
      email: 'admin@email.com',
      password: '123456',
      tipo: 'admins',
    })
    await Admin.create({
      nome: 'Admin',
      userId: usuario.id,
    })
  }
}
