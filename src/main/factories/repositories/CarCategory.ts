import { PrismaCarCategoriesRepository } from '@infra/database/prisma/repositories/CarCategory';

export function makeCarCategoriesRepository() {
  return new PrismaCarCategoriesRepository();
}
