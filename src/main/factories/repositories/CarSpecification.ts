import { PrismaCarSpecificationsRepository } from '@infra/database/prisma/repositories/CarSpecification';

export function makeCarSpecificationsRepository() {
  return new PrismaCarSpecificationsRepository();
}
