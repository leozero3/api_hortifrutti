import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import CreatePedidoValidator from 'App/Validators/CreatePedidoValidator'
import Cliente from 'App/models/Cliente'
import Endereco from 'App/models/Endereco'
import Pedido from 'App/models/Pedido'
import PedidoEndereco from 'App/models/PedidoEndereco'

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

      //Busca custo Entrega
    } catch (error) {
      await trx.rollback()
      return response.badRequest('Something in the request is wrong')
    }
  }
}
