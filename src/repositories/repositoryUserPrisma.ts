import type { UserEntity } from "../domain/User/entity/User.ts";
import { prismaService, PrismaClient } from "../services/prisma.ts";

class UserRepositoryPrisma {
  private prisma: PrismaClient;

  constructor(prismaService: PrismaClient) {
    this.prisma = prismaService;
  }

  async findAll() {
    const listUser = await this.prisma.user.findMany({
      orderBy: { name: "asc" },
      select: {
        name: true,
        cpf: true,
        email: true,
        password: true,
        id: true,
      },
    });
    return listUser;
  }

  async findById(id: string) {
    return await this.prisma.user.findFirst({
      where: {
        id,
      },
      include: {
        books: {
          select: {
            id: true,
            title: true,
            author: true,
            description: true,
          },
        },
      },
    });
  }

  async findByCpf(cpf: string) {
    return await this.prisma.user.findUnique({
      where: {
        cpf,
      },
    });
  }
  async findByEmail(email: string) {
    return await this.prisma.user.findFirst({
      where: {
        AND: [
          {
            email: {
              contains: email,
            },
          },
        ],
      },
    });
  }
  async create(user: Omit<UserEntity, "id">) {
    const newUser = await prismaService.user.create({
      data: {
        name: user.name,
        cpf: user.cpf,
        email: user.email,
        password: user.password,
      },
    });
    return newUser;
  }

  async update(id: string, updatedUser: Omit<UserEntity, "id">) {
    const userUpdated = await prismaService.user.update({
      where: {
        id,
      },
      data: {
        name: updatedUser.name,
        cpf: updatedUser.cpf,
        email: updatedUser.email,
        password: updatedUser.password,
      },
      
    });
    return userUpdated;
  }

  async delete(id: string) {
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
export default new UserRepositoryPrisma(prismaService);
//
