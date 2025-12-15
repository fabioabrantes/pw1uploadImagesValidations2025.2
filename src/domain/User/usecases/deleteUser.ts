import { AppErrosCustom } from "../../../errors/errorsAplications.ts";
import userRepositoryPrisma from "../../../repositories/repositoryUserPrisma.ts";

class DeleteUserUseCase {
  async execute(id: string) {
    let userExist = await userRepositoryPrisma.findById(id);
    if (!userExist) {
      throw new AppErrosCustom("cliente não existe no banco", 400);
    }
    userRepositoryPrisma.delete(id);
    return { status: 200, userDeleted: "usuário removido" };
  }
}

export default new DeleteUserUseCase();
