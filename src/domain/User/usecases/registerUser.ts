import { AppErrosCustom } from "../../../errors/errorsAplications.ts";
import UserRepositoryPrisma from "../../../repositories/repositoryUserPrisma.ts";
import type { UserEntity } from "../entity/User.ts";

class RegisterUserUseCase {
  async execute(userParams: Omit<UserEntity,"id">) {
    let userExist = await UserRepositoryPrisma.findByCpf(userParams.cpf);
    if (userExist) {
      throw new AppErrosCustom("cliente ja existe no banco", 400);
    }
    
    const userCreated= await UserRepositoryPrisma.create(userParams);
    return { status: 201, body: userCreated };
  }
}

export default new RegisterUserUseCase();
