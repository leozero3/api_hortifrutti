import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateEditEnderecoValidator from 'App/Validators/CreateEditEnderecoValidator'
import CreateEditValidator from 'App/Validators/CreateEditEnderecoValidator'
import Cliente from 'App/models/Cliente'
import Endereco from 'App/models/Endereco'

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

  public async store({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(CreateEditValidator)
    const userAuth = await auth.use('api').authenticate()
    const cliente = await Cliente.findByOrFail('user_id', userAuth.id)

    const endereco = await Endereco.create({
      cidade_id: payload.cidade_id,
      cliente_id: cliente.id,
      rua: payload.rua,
      numero: payload.numero,
      bairro: payload.bairro,
      ponto_referencia: payload.ponto_referencia,
      complemento: payload.complemento,
    })

    return response.ok(endereco)
  }
  public async update({ request, response, params }: HttpContextContract) {
    const payload = await request.validate(CreateEditEnderecoValidator)
    const endereco = await Endereco.findOrFail(params.id)

    endereco.merge(payload)

    await endereco.save()

    return response.ok(endereco)
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const resp = await Endereco.query().where('id', params.id).delete()

      if (resp.includes(1)) {
        return response.noContent()
      } else {
        return response.notFound()
      }
    } catch (error) {
      return response.badRequest()
    }
  }
}
