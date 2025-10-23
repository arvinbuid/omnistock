// Re-using a single PrismaClient instance variable to use across the app

// ref: https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections#prismaclient-in-long-running-applications

import {PrismaClient} from "@prisma/client/extension";

const globalForPrisma = globalThis as unknown as {prisma: PrismaClient};

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
