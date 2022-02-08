import { IRent } from '@domain/models/Rent';

interface ICreateRentRepository {
  create(
    data: ICreateRentRepository.Input
  ): Promise<ICreateRentRepository.Output>;
}

namespace ICreateRentRepository {
  export type Input = Pick<
    IRent,
    | 'user_id'
    | 'car_id'
    | 'daily_late_fee'
    | 'daily_rate'
    | 'start_date'
    | 'expected_return_date'
  >;

  export type Output = IRent;
}

export { ICreateRentRepository };
