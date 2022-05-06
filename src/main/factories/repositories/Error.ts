import { PrismaErrorsRepository } from '@infra/database/prisma/repositories/Error';

export function makeErrorsRepository() {
  return new PrismaErrorsRepository();
}
