import { Rent } from '@domain/entities/Rent';

interface IUpdateRentRepository {
  update(
    data: IUpdateRentRepository.Input
  ): Promise<IUpdateRentRepository.Output>;
}

namespace IUpdateRentRepository {
  export type Input = Pick<Rent, 'id'> &
    Pick<
      Partial<Rent>,
      | 'daily_late_fee'
      | 'daily_rate'
      | 'expected_return_date'
      | 'payment_id'
      | 'return_date'
      | 'start_date'
    >;

  export type Output = Rent;
}

export { IUpdateRentRepository };
