import { IRent } from '@domain/models/Rent';

interface ICreateRentUseCase {
  execute(data: ICreateRentUseCase.Input): Promise<ICreateRentUseCase.Output>;
}

namespace ICreateRentUseCase {
  export type Input = {
    user_id: string;
    car_id: string;
    start_date: Date;
    expected_return_date: Date;
  };

  export type Output = IRent;
}

export { ICreateRentUseCase };
