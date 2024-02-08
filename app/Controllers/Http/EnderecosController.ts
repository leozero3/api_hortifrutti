import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateEditValidator from 'App/Validators/CreateEditValidator'
import Cliente from 'App/models/Cliente'

export default class EnderecosController {
  public async index({ response, auth }: HttpContextContract) {
    const userAuth = await auth.use('api').authenticate()
    const cliente = await Cliente.findByOrFail('user_id', userAuth.id)

    const getCliente = await Cliente.query()
      .where('id', cliente.id)
      .preload('enderecos', (CidadeQuery) => {
        CidadeQuery.preload('cidade', (queryEstado) => {
          queryEstado.preload('estado')
        })
      })
      .firstOrFail()

    return response.ok(getCliente.enderecos)
  }

  public async create({}: HttpContextContract) {}

  public async store({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(CreateEditValidator)
    const userAuth = await auth.use('api').authenticate().
    const cliente = await Cliente.findByOrFail('user_id', userAuth)

    const endereco = await Endereco.create({
      cliente_id: payload.cliente_id,
      cidade_id: payload.cidade_id,
      rua: payload.rua,
      numero: payload.numero,
      bairro: payload.bairro,
      pontoReferencia: payload.pontoReferencia,
      complemento: payload.complemento,
    })

    return response.ok(endereco)
  }

  public async update({ request, response }: HttpContextContract) {}

  public async destroy({ request, response }: HttpContextContract) {}
}
