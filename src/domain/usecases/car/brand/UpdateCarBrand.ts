import { ICarBrand } from '@domain/models/CarBrand';

interface IUpdateCarBrandUseCase {
  execute(
    data: IUpdateCarBrandUseCase.Input
  ): Promise<IUpdateCarBrandUseCase.Output>;
}

namespace IUpdateCarBrandUseCase {
  export type Input = {
    id: string;
    name: string;
  };

  export type Output = ICarBrand;
}

export { IUpdateCarBrandUseCase };
