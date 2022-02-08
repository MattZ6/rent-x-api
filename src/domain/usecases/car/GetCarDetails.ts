import { ICar } from '@domain/models/Car';

interface IGetCarDetailsUseCase {
  execute(
    data: IGetCarDetailsUseCase.Input
  ): Promise<IGetCarDetailsUseCase.Output>;
}

namespace IGetCarDetailsUseCase {
  export type Input = {
    car_id: string;
  };

  export type Output = ICar;
}

export { IGetCarDetailsUseCase };
