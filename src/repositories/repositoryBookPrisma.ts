import { prismaService, PrismaClient } from "../services/prisma.ts";
import type { BookEntity } from "../domain/Book/entity/Book.ts";

class BookRepositoryPrisma {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async register(bookParams: Omit<BookEntity, "id">) {
    const book = await this.prisma.book.create({
      data: {
        ISBN: bookParams.ISBN,
        title: bookParams.title,
        author: bookParams.author,
        description: bookParams.description,
        userIdFK: bookParams.userIdFK,
        images: {
          create: [...bookParams.images],
        },
      },
      select: {
        id: true,
        ISBN: true,
        title: true,
        author: true,
        description: true,
        images: {
          select: {
            pictureName: true,
          },
        },
      },
    });
    return book;
  }

  async getBookByISBN(ISBNParams: string) {
    const book = await this.prisma.book.findUnique({
      where: {
        ISBN: ISBNParams,
      },
      select: {
        id: true,
        ISBN: true,
        title: true,
        author: true,
        description: true,
        userIdFK: true,
      },
    });
    return book;
  }

  async getAll(userIdParams: string) {
    const books = await this.prisma.book.findMany({
      where: {
        userIdFK: userIdParams,
      },
      select: {
        id: true,
        ISBN: true,
        title: true,
        author: true,
        description: true,
      },
    });
    return books;
  }
}

export default new BookRepositoryPrisma(prismaService);
