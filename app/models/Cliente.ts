import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Endereco from './Endereco'

export default class Cliente extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column()
  public nome: string

  @column()
  public telefone: string

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Endereco, {
    foreignKey: 'cliente_id',
    localKey: 'id',
  })
  public enderecos: HasMany<typeof Endereco>
}
