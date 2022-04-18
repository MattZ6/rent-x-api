import { IRentPayment } from '@domain/entities/RentPayment';

interface ICreateRentPaymentRepository {
  create(
    data: ICreateRentPaymentRepository.Input
  ): Promise<ICreateRentPaymentRepository.Output>;
}

namespace ICreateRentPaymentRepository {
  export type Input = Pick<IRentPayment, 'rent_id' | 'total'>;

  export type Output = IRentPayment;
}

export { ICreateRentPaymentRepository };
