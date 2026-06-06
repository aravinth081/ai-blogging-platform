import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const db =
  globalForPrisma.prisma ||
  new PrismaClient({
    accelerateUrl: process.env.DATABASE_URL || "prisma://inksphere-mock-endpoint",
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
