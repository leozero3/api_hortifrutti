import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import CreatePedidoValidator from 'App/Validators/CreatePedidoValidator'
import CidadesEstabelecimento from 'App/models/CidadesEstabelecimento'
import Cliente from 'App/models/Cliente'
import Endereco from 'App/models/Endereco'
import Pedido from 'App/models/Pedido'
import PedidoEndereco from 'App/models/PedidoEndereco'
import PedidoProduto from 'App/models/PedidoProduto'
import PedidoStatus from 'App/models/PedidoStatus'
import Produto from 'App/models/Produto'

var randomstring = require('randomstring')

export default class PedidosController {
  public async store({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(CreatePedidoValidator)
    const userAuth = await auth.use('api').authenticate()
    const cliente = await Cliente.findByOrFail('user_id', userAuth.id)

    let hash_ok: boolean = false
    let hash_id: string = ''

    while (hash_ok == false) {
      hash_id = randomstring.generate({
        length: 6,
        charset: 'alphanumeric',
        capitalization: 'uppercase',
      })
      const hash = await Pedido.findBy('hash_id', hash_id)

      if (hash == null) {
        hash_ok = true
      }
    }
    // transaction criando

    const trx = await Database.transaction()

    const endereco = await Endereco.findByOrFail('id', payload.endereco_id)

    try {
      const end = await PedidoEndereco.create({
        cidade_id: endereco.cidade_id,
        rua: endereco.rua,
        numero: endereco.numero,
        bairro: endereco.bairro,
        ponto_referencia: endereco.ponto_referencia,
        complemento: endereco.complemento,
      })

      //Busca custo Entrega e calcular o valor total do pedido
      const estabCidade = await CidadesEstabelecimento.query()
        .where('estabelecimento_id', payload.estabelecimento_id)
        .where('cidade_id', endereco.cidade_id)
        .firstOrFail()

      let valorTotal = 0
      for await (const produto of payload.produtos) {
        const prod = await Produto.findByOrFail('id', produto.produto_id)
        valorTotal += produto.quantidade * prod.preco
      }
      valorTotal = estabCidade ? valorTotal + estabCidade.custo_entrega : valorTotal

      valorTotal = parseFloat(valorTotal.toFixed(2))

      if (payload.troco_para != null && payload.troco_para < valorTotal) {
        trx.rollback()
        return response.badRequest(
          'O valor do troco nao pode ser menor que o valor total do pedido'
        )
      }
      const pedido = await Pedido.create({
        hash_id: hash_id,
        cliente_id: cliente.id,
        estabelecimento_id: payload.estabelecimento_id,
        meio_pagamento_id: payload.meios_pagamento_id,
        pedido_endereco_id: end.id,
        valor: valorTotal,
        troco: payload.troco_para,
        custo_entrega: estabCidade ? estabCidade.custo_entrega : 0,
        observacao: payload.observacao,
      })

      payload.produtos.forEach(async (produto) => {
        let getProduto = await Produto.findByOrFail('id', produto.produto_id)

        await PedidoProduto.create({
          pedido_id: pedido.id,
          produto_id: produto.produto_id,
          valor: getProduto.preco,
          quantidade: produto.quantidade,
          observacao: produto.observacao,
        })
      })

      await PedidoStatus.create({
        pedido_id: pedido.id,
        status_id: 1,
      })

      // Confirma a transação
      await trx.commit()

      return response.ok(pedido)
      //
    } catch (error) {
      await trx.rollback()
      return response.badRequest('Something in the request is wrong')
    }
  }
}
