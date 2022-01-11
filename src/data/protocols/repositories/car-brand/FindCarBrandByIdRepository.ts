import { ICarBrand } from '@domain/models/CarBrand';

interface IFindCarBrandByIdRepository {
  findById(
    data: IFindCarBrandByIdRepository.Input
  ): Promise<IFindCarBrandByIdRepository.Output>;
}

namespace IFindCarBrandByIdRepository {
  export type Input = {
    id: string;
  };

  export type Output = ICarBrand | undefined;
}

export { IFindCarBrandByIdRepository };
