import { ICreateRentPaymentRepository } from '@data/protocols/repositories/rent-payment';

import { rentPaymentMock } from '../../../domain/models/rent-payment.mock';

export class CreateRentPaymentRepositorySpy
  implements ICreateRentPaymentRepository
{
  async create(
    _: ICreateRentPaymentRepository.Input
  ): Promise<ICreateRentPaymentRepository.Output> {
    return rentPaymentMock;
  }
}