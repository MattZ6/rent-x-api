import { PrismaUsersRepostory } from '@infra/database/prisma/repositories/User';

export function makeUsersRepository() {
  return new PrismaUsersRepostory();
}
