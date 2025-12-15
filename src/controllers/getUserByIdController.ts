import type { Request, Response } from "express";
import getUserByIdUseCase from "../domain/User/usecases/getUserById.ts";

type ParamsType = {
  id: string;
};
class GetUserByIdController {
  async handle(request: Request, response: Response) {
    const id  = request.userId as string;
    const result = await getUserByIdUseCase.execute(id);
    
    response.status(result.status).json(result.body);
    return;
  }
}
export default new GetUserByIdController();
