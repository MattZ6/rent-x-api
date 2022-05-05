import { PrismaUserTokensRepository } from '@infra/database/prisma/repositories/UserToken';

export function makeUserTokensRepository() {
  return new PrismaUserTokensRepository();
}
