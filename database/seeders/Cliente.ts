import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Cliente from 'App/models/Cliente'
import User from 'App/models/user'

export default class ClienteSeeder extends BaseSeeder {
  public async run() {
    const usuario = await User.create({
      email: 'cliente@email.com',
      password: '123456',
      tipo: 'clientes',
    })
    await Cliente.create({
      nome: 'Cliente',
      telefone: '19 99999-8888',
      userId: usuario.id,
    })
  }
}
