import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

function createPrismaClient(): PrismaClient {
  return new PrismaClient();
}

export const db: PrismaClient = (() => {
  // If no DATABASE_URL, return a proxy that throws on actual usage
  // This allows the build to succeed without a database connection
  if (!process.env.DATABASE_URL) {
    return new Proxy({} as PrismaClient, {
      get(_target, prop) {
        // Allow basic property access that Prisma/Next.js might check
        if (prop === "then" || prop === Symbol.toPrimitive || prop === Symbol.toStringTag) {
          return undefined;
        }
        // For any model access (e.g., db.post), return another proxy
        // that will throw only when an actual query is attempted
        return new Proxy({} as any, {
          get(_t, method) {
            return (..._args: any[]) => {
              throw new Error(
                `Database not configured. Set DATABASE_URL environment variable.`
              );
            };
          },
        });
      },
    });
  }

  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }

  const client = createPrismaClient();
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = client;
  }
  return client;
})();
