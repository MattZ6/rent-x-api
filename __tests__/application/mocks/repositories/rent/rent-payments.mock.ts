import { ICreateRentPaymentRepository } from '@application/protocols/repositories/rent-payment';

import { rentPaymentMock } from '../../../../domain/models';

export class CreateRentPaymentRepositorySpy
  implements ICreateRentPaymentRepository
{
  async create(
    _: ICreateRentPaymentRepository.Input
  ): Promise<ICreateRentPaymentRepository.Output> {
    return rentPaymentMock;
  }
}
