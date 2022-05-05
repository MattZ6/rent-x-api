import { PrismaCarsRepository } from '@infra/database/prisma/repositories/Car';

export function makeCarsRepository() {
  return new PrismaCarsRepository();
}
