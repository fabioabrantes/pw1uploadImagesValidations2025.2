import type { Request, Response } from "express";
import { hash } from "bcryptjs";

import updateUserUseCase from "../domain/User/usecases/updateUser.ts";

type ParamsType = {
  id: string;
};
type BodyType = {
  name: string;
  cpf: string;
  email: string;
  password: string;
};
class UpdateUserController {
  async handle(request: Request, response: Response) {
    const { cpf, name, email, password } = request.body as BodyType;
    const { id } = request.params as ParamsType;

    //formatando e validandoos dados
    const passwordCrypt = await hash(password, 4);
    
    const result = await updateUserUseCase.execute(id, {
      name,
      cpf,
      email,
      password:passwordCrypt,
    });

    response.status(result.status).json(result.userUpdated);
    return;
  }
}

export default new UpdateUserController();
