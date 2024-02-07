import { BaseModel, HasOne, ManyToMany, column, hasOne, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Estado from './Estado'
import Estabelecimento from './Estabelecimento'

export default class Cidade extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column()
  public estadoId: number

  @column()
  public ativo: boolean

  @hasOne(() => Estado, {
    foreignKey: 'id',
    localKey: 'estado_id',
  })
  public estado: HasOne<typeof Estado>

  @manyToMany(() => Estabelecimento, {
    pivotTable: 'cidades_estabelecimentos',
    localKey: 'id',
    pivotForeignKey: 'cidade_id',
    relatedKey: 'estabelecimento_id',
    pivotRelatedForeignKey: 'estabelecimento_id',
  })
  public estabelecimentos: ManyToMany<typeof Estabelecimento>
}
