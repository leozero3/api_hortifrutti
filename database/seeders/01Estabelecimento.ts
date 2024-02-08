import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Estabelecimento from 'App/models/Estabelecimento'
import User from 'App/models/user'
import { faker } from '@faker-js/faker'
import Estado from 'App/models/Estado'
import Cidade from 'App/models/Cidade'
import CidadesEstabelecimento from 'App/models/CidadesEstabelecimento'

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
        logo: `https://picsum.photos/id/${i}/200/200`,
        bloqueado: false,
        online: true,
        userId: i,
      })
    }

    await Estado.createMany([
      {
        nome: 'Minas Gerais',
        uf: 'MG',
      },
      {
        nome: 'Espirito Santo',
        uf: 'ES',
      },
    ]),
      await Cidade.createMany([
        {
          nome: 'Aimorés',
          estado_id: 1,
        },
        {
          nome: 'Colatina',
          estado_id: 2,
        },
      ])

    for (let i = 1; i < 20; i++) {
      await CidadesEstabelecimento.create({
        cidade_id: faker.number.int({ min: 1, max: 2 }),
        estabelecimento_id: i,
        custo_entrega: faker.number.float({ min: 0, max: 3, multipleOf: 0.01 }),
      })
    }
  }
}
