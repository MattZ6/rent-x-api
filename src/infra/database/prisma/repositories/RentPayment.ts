import { ICreateRentPaymentRepository } from '@application/protocols/repositories/rent/payment';

import { prisma } from '..';

export class PrismaRentPaymentsRepository
  implements ICreateRentPaymentRepository
{
  async create(
    data: ICreateRentPaymentRepository.Input
  ): Promise<ICreateRentPaymentRepository.Output> {
    const { rent_id, total } = data;

    const rentPayment = await prisma.rentPayment.create({
      data: {
        rent_id,
        total,
      },
    });

    return rentPayment;
  }
}
