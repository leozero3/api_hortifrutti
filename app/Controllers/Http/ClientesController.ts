import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateClienteValidator from 'App/Validators/CreateClienteValidator'
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
}
