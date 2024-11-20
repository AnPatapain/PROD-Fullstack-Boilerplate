import {PrismaClient, Prisma} from "@prisma/client";

const PRISMA_CLIENT = new PrismaClient();

export {PRISMA_CLIENT, Prisma};