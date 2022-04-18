import { ICarBrand } from '@domain/entities/CarBrand';

interface IUpdateCarBrandRepository {
  update(
    data: IUpdateCarBrandRepository.Input
  ): Promise<IUpdateCarBrandRepository.Output>;
}

namespace IUpdateCarBrandRepository {
  export type Input = ICarBrand;

  export type Output = ICarBrand;
}

export { IUpdateCarBrandRepository };
