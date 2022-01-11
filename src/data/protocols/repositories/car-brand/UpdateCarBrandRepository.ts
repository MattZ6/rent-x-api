import { ICarBrand } from '@domain/models/CarBrand';

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
