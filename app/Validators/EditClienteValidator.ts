import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EditClienteValidator {
  constructor(protected ctx: HttpContextContract) {}

  public refs = schema.refs({
    user_id: this.ctx.auth.user!.id,
  })

  public schema = schema.create({
    nome: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(255)]),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.maxLength(255),
      rules.unique({ table: 'users', column: 'email', whereNot: { id: this.refs.user_id } }),
    ]),
    password: schema.string.nullableAndOptional({}, [rules.minLength(8), rules.maxLength(180)]),
    telefone: schema.string({ trim: true }, [
      rules.mobile({ locale: ['pt-BR'] }),
      rules.maxLength(15),
    ]),
  })

  public messages: CustomMessages = {
    'required': '{{ field }} é obrigatorio para o cadastro',
    'email.email': '{{ field }} deve ser um e-mail válido',
    'email.unique': '{{ field }} já está cadastrado',
    'password.minLength': '{{ field }} deve conter no mínimo 8 caracteres',
    'password.maxLength': '{{ field }} deve conter no máximo 180 caracteres',
    'nome.minLength': '{{ field }} deve conter no mínimo 3 caracteres',
    'nome.maxLength': '{{ field }} deve conter no máximo 255 caracteres',
    'telefone.mobile': '{{ field }} deve ser um telefone valido',
  }
}
