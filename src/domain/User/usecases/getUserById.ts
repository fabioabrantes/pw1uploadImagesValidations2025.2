import { AppErrosCustom } from "../../../errors/errorsAplications.ts";
import userRepositoryPrisma from "../../../repositories/repositoryUserPrisma.ts";

class GetUserByIdUseCase {
  async execute(id: string) {
    let userExist = await userRepositoryPrisma.findById(id);
    if (!userExist) {
      throw new AppErrosCustom("cliente não existe no banco",400);
    }
    return { status: 200, body: userExist };
  }
}

export default new GetUserByIdUseCase();
