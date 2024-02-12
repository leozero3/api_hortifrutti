import { DateTime } from 'luxon'
import { BaseModel, HasMany, ManyToMany, column, hasMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Categoria from './Categoria'
import MeiosPagamento from './MeiosPagamento'

export default class Estabelecimento extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public nome: string

  @column()
  public logo: string | null

  @column()
  public bloqueado: boolean

  @column()
  public online: boolean

  @column.dateTime({ autoCreate: true })
  public updatedAt: DateTime | null

  @hasMany(() => Categoria, {
    foreignKey: 'estabelecimento_id',
    localKey: 'id',
  })
  public categorias: HasMany<typeof Categoria>

  @manyToMany(() => MeiosPagamento, {
    pivotTable: 'estabelecimento_meios_pagamentos',
    localKey: 'id',
    pivotForeignKey: 'estabelecimento_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'meios_pagamento_id',
  })
  public meiosPagamentos: ManyToMany<typeof MeiosPagamento>
}
