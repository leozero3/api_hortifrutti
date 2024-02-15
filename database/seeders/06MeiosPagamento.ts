import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Estabelecimento from 'App/models/Estabelecimento'
import EstabelecimentosMeiosPagamento from 'App/models/EstabelecimentoMeiosPagamento'
import MeiosPagamento from 'App/models/MeiosPagamento'

export default class MeiosPagamentoSeeder extends BaseSeeder {
  public async run() {
    await MeiosPagamento.createMany([
      { nome: 'Dinheiro' },
      { nome: 'Cartão de Crédito/Debito' },
      { nome: 'PIX' },
      { nome: 'Picpay' },
    ])

    const estabelecimentos = await Estabelecimento.all()
    for (const estabelecimento of estabelecimentos) {
      await EstabelecimentosMeiosPagamento.createMany([
        {
          estabelecimento_id: estabelecimento.id,
          meio_pagamento_id: 1,
        },
        {
          estabelecimento_id: estabelecimento.id,
          meio_pagamento_id: 2,
        },
        {
          estabelecimento_id: estabelecimento.id,
          meio_pagamento_id: 3,
        },
        {
          estabelecimento_id: estabelecimento.id,
          meio_pagamento_id: 4,
        },
      ])
    }
  }
}
