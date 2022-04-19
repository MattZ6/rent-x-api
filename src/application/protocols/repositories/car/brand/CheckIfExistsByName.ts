import { CarBrand } from '@domain/entities/CarBrand';

interface ICheckIfCarBrandExistsByNameRepository {
  checkIfExistsByName(
    data: ICheckIfCarBrandExistsByNameRepository.Input
  ): Promise<ICheckIfCarBrandExistsByNameRepository.Output>;
}

namespace ICheckIfCarBrandExistsByNameRepository {
  export type Input = Pick<CarBrand, 'name'>;

  export type Output = boolean;
}

export { ICheckIfCarBrandExistsByNameRepository };
