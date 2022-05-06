import { PrismaCarBrandsRepository } from '@infra/database/prisma/repositories/CarBrand';

export function makeCarBrandsRepository() {
  return new PrismaCarBrandsRepository();
}
