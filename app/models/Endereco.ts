import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Endereco extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public cliente_id: number

  @column()
  public cidade_id: number

  @column()
  public rua: string

  @column()
  public numero: string | null

  @column()
  public bairro: string

  @column()
  public cep: string

  @column()
  public complemento: string | null

  @column()
  public ponto_referencia: string
}
