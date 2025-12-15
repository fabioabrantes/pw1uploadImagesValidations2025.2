import { AppErrosCustom } from "../../../errors/errorsAplications.ts";
import userRepositoryPrisma from "../../../repositories/repositoryUserPrisma.ts";
import type { UserEntity } from "../entity/User.ts";

class UpdateUserUseCase {
  async execute(id: string, userParams: Omit<UserEntity, "id">) {
    let userExist = await userRepositoryPrisma.findById(id);
    if (!userExist) {
      throw new AppErrosCustom("cliente não existe no banco", 400);
    }
    const userUpdated = await userRepositoryPrisma.update(id, userParams);
    return { status: 200, userUpdated: userUpdated };
  }
}

export default new UpdateUserUseCase();
