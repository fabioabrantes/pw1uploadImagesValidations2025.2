import type { Request, Response } from "express";
import { hash } from "bcryptjs";

import { validateZodUser } from "../services/zodValidations.ts";
import { AppErrorsZod } from "../errors/errorsZod.ts";

import RegisterUserUseCase from "../domain/User/usecases/registerUser.ts";
import type { UserEntity } from "../domain/User/entity/User.ts";

class RegisterUserController {
  async handle(request: Request, response: Response) {
    const { cpf, name, email, password } = request.body as Omit<
      UserEntity,
      "id"
    >;
    // validação do formato dos dados
    // validar os campos cpf, name e email usando a lib zod
    const resultValidation = validateZodUser({ cpf, name, email, password });
    if (resultValidation) {
      throw new AppErrorsZod(resultValidation.fieldErrors, 400);
    }

    //formatação dos dados
    let passwordCrypt = await hash(password, 4);

    const result = await RegisterUserUseCase.execute({
      name,
      cpf,
      email,
      password: passwordCrypt,
    });
    response.status(result.status).json(result.body);
    return;
  }
}

export default new RegisterUserController();
