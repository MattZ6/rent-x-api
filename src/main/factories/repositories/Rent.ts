import { PrismaRentsRepository } from '@infra/database/prisma/repositories/Rent';

export function makeRentsRepository() {
  return new PrismaRentsRepository();
}
