//import { PrismaClient } from "../generated/prisma/client.ts"
import { PrismaClient } from "../generated/prisma/client.ts";
const prismaService = new PrismaClient({
  log: ["query", "error"],
});
export { prismaService, PrismaClient };
