import { Car } from '@domain/entities/Car';

interface IGetCarDetailsUseCase {
  execute(
    data: IGetCarDetailsUseCase.Input
  ): Promise<IGetCarDetailsUseCase.Output>;
}

namespace IGetCarDetailsUseCase {
  export type Input = {
    car_id: string;
  };

  export type Output = Car | null;
}

export { IGetCarDetailsUseCase };
