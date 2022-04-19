import { CarBrand } from '@domain/entities/CarBrand';

interface IUpdateCarBrandUseCase {
  execute(
    data: IUpdateCarBrandUseCase.Input
  ): Promise<IUpdateCarBrandUseCase.Output>;
}

namespace IUpdateCarBrandUseCase {
  export type Input = Pick<Partial<CarBrand>, 'name'> & {
    id: string;
  };

  export type Output = CarBrand;
}

export { IUpdateCarBrandUseCase };
