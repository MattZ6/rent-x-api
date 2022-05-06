import { PrismaRentPaymentsRepository } from '@infra/database/prisma/repositories/RentPayment';

export function makeRentPaymentsRepository() {
  return new PrismaRentPaymentsRepository();
}
