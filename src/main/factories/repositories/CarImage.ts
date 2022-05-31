import { PrismaCarImagesRepository } from '@infra/database/prisma/repositories/CarImage';

export function makeCarImagesRepository() {
  return new PrismaCarImagesRepository();
}
