import { CarBrand } from '@domain/entities/CarBrand';

interface ICheckIfCarBrandExistsByIdRepository {
  checkIfExistsById(
    data: ICheckIfCarBrandExistsByIdRepository.Input
  ): Promise<ICheckIfCarBrandExistsByIdRepository.Output>;
}

namespace ICheckIfCarBrandExistsByIdRepository {
  export type Input = Pick<CarBrand, 'id'>;

  export type Output = boolean;
}

export { ICheckIfCarBrandExistsByIdRepository };
