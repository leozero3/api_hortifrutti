import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import CreateClienteValidator from 'App/Validators/CreateClienteValidator'
import EditClienteValidator from 'App/Validators/EditClienteValidator'
import Cliente from 'App/models/Cliente'
import User from 'App/models/user'

export default class ClientesController {
  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateClienteValidator)

    const user = await User.create({
      email: payload.email,
      password: payload.password,
      tipo: 'clientes',
    })

    const cliente = await Cliente.create({
      nome: payload.nome,
      telefone: payload.telefone,
      userId: user.id,
    })

    return response.ok({
      id_cliente: cliente.id,
      nome: cliente.nome,
      telefone: cliente.telefone,
      email: user.email,
    })
  }

  public async update({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(EditClienteValidator)
    const userAuth = await auth.use('api').authenticate()

    // criando uma transacao
    const transaction = await Database.transaction()

    try {
      const user = await User.findByOrFail('id', userAuth.id)
      const cliente = await Cliente.findByOrFail('user_id', userAuth.id)

      if (payload.password) {
        user.merge({ email: payload.email, password: payload.password })
      } else {
        user.merge({ email: payload.email })
      }

      await user.save()

      cliente.merge({ nome: payload.nome, telefone: payload.telefone })
      await cliente.save()

      //confirma no banco de dados as alteracoes
      await transaction.commit()

      return response.ok({
        id_cliente: cliente.id,
        nome: cliente.nome,
        telefone: cliente.telefone,
        email: user.email,
      })
    } catch (err) {
      await transaction.rollback()
      return response.badRequest('Algo errado na Requisição ')
    }
  }
}
