import bookRepositoryPrisma from "../../../repositories/repositoryBookPrisma.ts";

class GetUsersAllUseCase {
  async execute(userId:string) {
    let books = await bookRepositoryPrisma.getAll(userId);
    return { status: 200, body: books };
  }
}

export default new GetUsersAllUseCase();
