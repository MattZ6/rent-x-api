import { PrismaUserAvatarsRepository } from '@infra/database/prisma/repositories/UserAvatar';

export function makeUserAvatarsRepository() {
  return new PrismaUserAvatarsRepository();
}
