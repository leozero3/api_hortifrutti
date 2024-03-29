import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cidade from 'App/models/Cidade'
import CidadesEstabelecimento from 'App/models/CidadesEstabelecimento'
import Estabelecimento from 'App/models/Estabelecimento'
import Pedido from 'App/models/Pedido'

export default class EstabelecimentosController {
  public async pedidos({ response, auth }: HttpContextContract) {
    const userAuth = await auth.use('api').authenticate()

    const estabelecimento = await Estabelecimento.findByOrFail('user_id', userAuth.id)

    const pedidos = await Pedido.query()
      .where('estabelecimento_id', estabelecimento.id)
      .preload('cliente')
      .preload('pedido_status', (statusQuery) => {
        statusQuery.preload('status')
      })
      .orderBy('pedido_id', 'desc')

    return response.ok(pedidos)
  }

  public async show({ params, response }: HttpContextContract) {
    const idEst: number = params.id

    let arrayCidades: any = []
    const cidades = await CidadesEstabelecimento.query().where('estabelecimento_id', idEst)

    for await (const cidade of cidades) {
      const cidade_ = await Cidade.findByOrFail('id', cidade.cidade_id)
      arrayCidades.push({
        id: cidade_.id,
        cidade: cidade_.nome,
        custo_entrega: cidade.custo_entrega,
      })
    }

    const estabelecimento = await Estabelecimento.query()
      .where('id', idEst)
      .preload('categorias', (categoriasQuery) => {
        categoriasQuery.preload('produtos', (produtosQuery) => {
          produtosQuery.whereNull('deleted_at')
        })
      })
      .preload('meiospagamentos')
      .firstOrFail()

    return response.ok({
      id: estabelecimento.id,
      nome: estabelecimento.nome,
      logo: estabelecimento.logo,
      bloqueado: estabelecimento.bloqueado,
      online: estabelecimento.online,
      categorias: estabelecimento.categorias,
      meiosPagamentos: estabelecimento.meiospagamentos,
      cidades: arrayCidades,
    })
  }
}
