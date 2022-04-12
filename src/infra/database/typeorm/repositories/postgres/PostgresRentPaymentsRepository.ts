import { getRepository, Repository } from 'typeorm';

import { ICreateRentPaymentRepository } from '@application/protocols/repositories/rent-payment';

import { RentPayment } from '../../entities/RentPayment';

export class PostgresRentPaymentsRepository
  implements ICreateRentPaymentRepository
{
  private readonly repository: Repository<RentPayment>;

  constructor() {
    this.repository = getRepository(RentPayment);
  }

  async create(
    data: ICreateRentPaymentRepository.Input
  ): Promise<ICreateRentPaymentRepository.Output> {
    const { rent_id, total } = data;

    const rentPayment = this.repository.create({
      rent_id,
      total,
    });

    return this.repository.save(rentPayment);
  }
}
