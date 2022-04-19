import { Rent } from '@domain/entities/Rent';

interface ICreateRentUseCase {
  execute(data: ICreateRentUseCase.Input): Promise<ICreateRentUseCase.Output>;
}

namespace ICreateRentUseCase {
  export type Input = Pick<
    Rent,
    'user_id' | 'car_id' | 'start_date' | 'expected_return_date'
  >;

  export type Output = Rent;
}

export { ICreateRentUseCase };
