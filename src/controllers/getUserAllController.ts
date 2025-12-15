import type {Request,Response} from "express";
import GetUsersAllUseCase from "../domain/User/usecases/getUsersAll.ts"
class GetAllUsersController {
  async handle(request:Request, response:Response) {
    const result = await GetUsersAllUseCase.execute();
    response.status(result.status).json(result.body);
  }
}

export default new GetAllUsersController();