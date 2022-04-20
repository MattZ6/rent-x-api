import { CarSpecification } from '@domain/entities/CarSpecification';

interface ICheckIfCarSpecificationExistsByNameRepository {
  checkIfExistsByName(
    data: ICheckIfCarSpecificationExistsByNameRepository.Input
  ): Promise<ICheckIfCarSpecificationExistsByNameRepository.Output>;
}

namespace ICheckIfCarSpecificationExistsByNameRepository {
  export type Input = Pick<CarSpecification, 'name'>;

  export type Output = boolean;
}

export { ICheckIfCarSpecificationExistsByNameRepository };
