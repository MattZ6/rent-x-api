import { CarBrand } from '@domain/entities/CarBrand';

interface ICreateCarBrandRepository {
  create(
    data: ICreateCarBrandRepository.Input
  ): Promise<ICreateCarBrandRepository.Output>;
}

namespace ICreateCarBrandRepository {
  export type Input = Pick<CarBrand, 'name'>;

  export type Output = CarBrand;
}

export { ICreateCarBrandRepository };
