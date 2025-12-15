import userRepositoryPrisma from "../../../repositories/repositoryUserPrisma.ts";

class GetUsersAllUseCase {
  async execute() {
    let users = await userRepositoryPrisma.findAll();
    return { status: 200, body: users };
  }
}

export default new GetUsersAllUseCase();
