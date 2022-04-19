import { CarBrand } from '@domain/entities/CarBrand';

interface IUpdateCarBrandRepository {
  update(
    data: IUpdateCarBrandRepository.Input
  ): Promise<IUpdateCarBrandRepository.Output>;
}

namespace IUpdateCarBrandRepository {
  export type Input = Pick<CarBrand, 'id'> & Pick<Partial<CarBrand>, 'name'>;

  export type Output = CarBrand;
}

export { IUpdateCarBrandRepository };
