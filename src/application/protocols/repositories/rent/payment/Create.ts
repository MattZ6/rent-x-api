import { RentPayment } from '@domain/entities/RentPayment';

interface ICreateRentPaymentRepository {
  create(
    data: ICreateRentPaymentRepository.Input
  ): Promise<ICreateRentPaymentRepository.Output>;
}

namespace ICreateRentPaymentRepository {
  export type Input = Pick<RentPayment, 'rent_id' | 'total'>;

  export type Output = RentPayment;
}

export { ICreateRentPaymentRepository };
