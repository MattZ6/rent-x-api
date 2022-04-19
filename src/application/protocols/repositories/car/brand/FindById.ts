import { CarBrand } from '@domain/entities/CarBrand';

interface IFindCarBrandByIdRepository {
  findById(
    data: IFindCarBrandByIdRepository.Input
  ): Promise<IFindCarBrandByIdRepository.Output>;
}

namespace IFindCarBrandByIdRepository {
  export type Input = Pick<CarBrand, 'id'>;

  export type Output = CarBrand | null;
}

export { IFindCarBrandByIdRepository };
