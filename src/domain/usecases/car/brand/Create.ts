import { CarBrand } from '@domain/entities/CarBrand';

interface ICreateCarBrandUseCase {
  execute(
    data: ICreateCarBrandUseCase.Input
  ): Promise<ICreateCarBrandUseCase.Output>;
}

namespace ICreateCarBrandUseCase {
  export type Input = Pick<CarBrand, 'name'>;

  export type Output = CarBrand;
}

export { ICreateCarBrandUseCase };
