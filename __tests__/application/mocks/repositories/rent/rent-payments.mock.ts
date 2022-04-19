import { ICreateRentPaymentRepository } from '@application/protocols/repositories/rent/payment';

import { makeRentPaymentMock } from '../../../../domain';

export class CreateRentPaymentRepositorySpy
  implements ICreateRentPaymentRepository
{
  async create(
    data: ICreateRentPaymentRepository.Input
  ): Promise<ICreateRentPaymentRepository.Output> {
    const { rent_id, total } = data;

    const rentPaymentMock = makeRentPaymentMock();

    Object.assign(rentPaymentMock, { rent_id, total });

    return rentPaymentMock;
  }
}
