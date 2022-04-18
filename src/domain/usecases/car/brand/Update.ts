import { ICarBrand } from '@domain/entities/CarBrand';

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
