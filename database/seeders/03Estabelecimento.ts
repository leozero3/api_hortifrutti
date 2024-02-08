import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Estabelecimento from 'App/models/Estabelecimento'
import User from 'App/models/user'
import { faker } from '@faker-js/faker'

export default class EstabelecimentoSeeder extends BaseSeeder {
  public async run() {
    const usuario = await User.create({
      email: 'estabelecimento@email.com',
      password: '123456',
      tipo: 'estabelecimento',
    })
    await Estabelecimento.create({
      nome: 'Estabelecimentos',
      logo: 'https://via.placeholder.com/150',
      bloqueado: false,
      online: true,
      userId: usuario.id,
    })

    for (let i = 2; i < 20; i++) {
      await User.create({
        email: `estabelecimento${i}@email.com`,
        password: `${i}132465`,
        tipo: 'estabelecimentos',
      })
    }

    for (let i = 2; i < 20; i++) {
      await Estabelecimento.create({
        nome: `Estabelecimento ${i}`,
        logo: 'https://picsum.photos/id/${i}/200/200',
        bloqueado: false,
        online: true,
        userId: i,
      })
    }
  }
}
