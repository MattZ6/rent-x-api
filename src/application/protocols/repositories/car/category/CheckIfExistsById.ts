import { CarCategory } from '@domain/entities/CarCategory';

interface ICheckIfCarCategoryExistsByIdRepository {
  checkIfExistsById(
    data: ICheckIfCarCategoryExistsByIdRepository.Input
  ): Promise<ICheckIfCarCategoryExistsByIdRepository.Output>;
}

namespace ICheckIfCarCategoryExistsByIdRepository {
  export type Input = Pick<CarCategory, 'id'>;

  export type Output = boolean;
}

export { ICheckIfCarCategoryExistsByIdRepository };
