import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cidade from 'App/models/Cidade'

export default class CidadesController {
  public async index({ response }: HttpContextContract) {
    const cidades = await Cidade.query()
      .whereHas('estabelecimentos', (quary) => {
        quary.where('bloqueado', false)
      })
      .preload('estado')

    return response.ok(cidades)
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
