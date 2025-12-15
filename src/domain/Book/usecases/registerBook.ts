import { AppErrosCustom } from "../../../errors/errorsAplications.ts";
import bookRepositoryPrisma from "../../../repositories/repositoryBookPrisma.ts";
import type { BookEntity } from "../entity/Book.ts";

class RegisterBook {
  async execute(bookParams: Omit<BookEntity, "id">) {
    let bookExist = await bookRepositoryPrisma.getBookByISBN(bookParams.ISBN);
    if (bookExist) {
      throw new AppErrosCustom("O livro ja está cadastrado no banco", 400);
    }

    const userCreated = await bookRepositoryPrisma.register(bookParams);
    return { status: 201, body: userCreated };
  }
}

export default new RegisterBook();
