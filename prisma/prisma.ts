import { PrismaClient } from '@prisma/client';

const saveFn = async (prismaClient: PrismaClient) => {
  // Function implementation
}

const client = new PrismaClient()
await saveFn(client)