import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Estabelecimento from 'App/models/Estabelecimento'
import User from 'App/models/user'

export default class extends BaseSeeder {
  public async run() {
    const usuario = await User.create({
      email: 'estabelecimento@email.com',
      password: '123456',
      tipo: 'estabelecimento',
    })
    await Estabelecimento.create({
      nome: 'Estabelecimento',
      logo: 'https://via.placeholder.com/150',
      bloqueado: false,
      online: true,
      userId: usuario.id,
    })
  }
}
