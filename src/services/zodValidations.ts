import { z } from "zod";
import type { UserEntity } from "../domain/User/entity/User.ts";
import type { BookEntity } from "../domain/Book/entity/Book.ts";

export function validateZodUser(user: Omit<UserEntity, "id">) {
  // Regex para CPF (formato 000.000.000-00 ou apenas números)
  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/;

  const userSchema = z.object({
    cpf: z
      .string("campo deve ser obrigatório e deve ser texto")
      .regex(cpfRegex, "CPF formato inválido. digite aaa.aaa.aaa-aa"),
    name: z
      .string("campo deve ser obrigatório e deve ser texto")
      .trim()
      .min(3, "Nome deve ter pelo menos 3 caracteres"),
    email: z.email("E-mail inválido"),
    password: z.coerce
      .string("campo deve ser obrigatório")
      .min(6, "Senha deve ter pelo menos 6 caracteres"),
  });

  const result = userSchema.safeParse(user); // aqui tras todas as mensagens onde teve errors

  if (!result.error) {
    return;
  }
  //formatando os erros
  const { fieldErrors } = z.flattenError(result.error); //https://zod.dev/error-formatting

  return { fieldErrors };
}

export function validateZodBook(book: Omit<BookEntity, "id">) {
  const registerBookSchema = z.object({
    author: z
      .string("error: campo obrigatório")
      .trim()
      .min(3, "error: Nome deve ter pelo menos 3 caracteres"),
    title: z
      .string("Error: Título é obrigatório")
      .trim()
      .min(3, "error: Título deve ter pelo menos 1 caracteres"),
    descriptionType: z
      .string()
      .trim()
      .min(1, "A descrição não pode conter apenas espaços"),
    userId: z
      .string("ID do usuário é obrigatório")
      .uuid("ID do usuário inválido"),
    ImagesBook: z
      .array(
        z.object({
          pictureName: z
            .string("Nome da imagem é obrigatório")
            .trim()
            .regex(
              /^[a-zA-Z0-9_-]+\.(jpg|jpeg|png)$/i,
              "Error: O nome do arquivo  ou extensão inválidas (ex: fabio2_A.jpg, fabio2-A.png)"
            ), //garantir também que o nome não tenha espaços ou caracteres inválidos
        })
      )
      .min(1, "Pelo menos uma imagem deve ser enviada"),
  });

  const result = registerBookSchema.safeParse(book); // aqui tras todas as mensagens onde teve errors

  if (!result.error) {
    return;
  }
  //formatando os erros
  const { fieldErrors } = z.flattenError(result.error); //https://zod.dev/error-formatting

  return { fieldErrors };
}
