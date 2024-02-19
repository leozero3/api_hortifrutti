import { faker } from '@faker-js/faker'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Cidade from 'App/models/Cidade'
import CidadesEstabelecimento from 'App/models/CidadesEstabelecimento'
import Estabelecimento from 'App/models/Estabelecimento'
import Estado from 'App/models/Estado'
import User from 'App/models/user'

export default class EstabelecimentoSeeder extends BaseSeeder {
  public async run() {
    const user = await User.create({
      email: 'leo@leo.com',
      password: '123456',
      tipo: 'estabelecimentos',
    })

    await Estabelecimento.create({
      nome: 'loja do Isaac',
      online: true,
      bloqueado: false,
      userId: user.id,
      logo: faker.image.avatar(),
    })

    for (let i = 2; i <= 20; i++) {
      await User.create({
        email: `estabelecimento${i}@email.com`,
        password: '12345678',
        tipo: 'estabelecimentos',
      })
    }

    for (let i = 2; i <= 20; i++) {
      await Estabelecimento.create({
        nome: faker.company.name(),
        online: true,
        bloqueado: false,
        userId: i,
        logo: faker.image.avatar(),
      })
    }

    await Estado.createMany([
      {
        nome: 'Minas Gerais',
        uf: 'MG',
      },
      {
        nome: 'Espírito Santo',
        uf: 'ES',
      },
    ])

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

    for (let i = 1; i <= 20; i++) {
      await CidadesEstabelecimento.create({
        cidade_id: faker.number.int({ min: 1, max: 2 }),
        estabelecimento_id: i,
        custo_entrega: faker.number.float({
          min: 0,
          max: 3,
          precision: 0.5,
        }),
      })
    }
  }
}
