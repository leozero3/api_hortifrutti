import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
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
}
