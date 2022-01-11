import { ICarBrand } from '@domain/models/CarBrand';

interface ICreateCarBrandUseCase {
  execute(
    data: ICreateCarBrandUseCase.Input
  ): Promise<ICreateCarBrandUseCase.Output>;
}

namespace ICreateCarBrandUseCase {
  export type Input = {
    name: string;
  };

  export type Output = ICarBrand;
}

export { ICreateCarBrandUseCase };
