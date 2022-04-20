import { CarBrand } from '@domain/entities/CarBrand';

interface IUpdateCarBrandUseCase {
  execute(
    data: IUpdateCarBrandUseCase.Input
  ): Promise<IUpdateCarBrandUseCase.Output>;
}

namespace IUpdateCarBrandUseCase {
  export type Input = Pick<CarBrand, 'id' | 'name'>;

  export type Output = CarBrand;
}

export { IUpdateCarBrandUseCase };
