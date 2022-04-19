import { CarCategory } from '@domain/entities/CarCategory';

interface ICheckIfCarCategoryExistsByNameRepository {
  checkIfExistsByName(
    data: ICheckIfCarCategoryExistsByNameRepository.Input
  ): Promise<ICheckIfCarCategoryExistsByNameRepository.Output>;
}

namespace ICheckIfCarCategoryExistsByNameRepository {
  export type Input = Pick<CarCategory, 'name'>;

  export type Output = boolean;
}

export { ICheckIfCarCategoryExistsByNameRepository };
