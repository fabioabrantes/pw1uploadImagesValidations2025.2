import type { Request, Response } from "express";
import DeleteUserUseCase from "../domain/User/usecases/deleteUser.ts";

type ParamsType = {
  id: string;
};

class DeleteUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.params as ParamsType;

    const result = await DeleteUserUseCase.execute(id);
    
    response.status(result.status).json(result.userDeleted);
    return;
  }
}

export default new DeleteUserController();
