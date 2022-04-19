import { CarSpecification } from '@domain/entities/CarSpecification';

interface ICheckIfCarSpecificationExistsByIdRepository {
  checkIfExistsById(
    data: ICheckIfCarSpecificationExistsByIdRepository.Input
  ): Promise<ICheckIfCarSpecificationExistsByIdRepository.Output>;
}

namespace ICheckIfCarSpecificationExistsByIdRepository {
  export type Input = Pick<CarSpecification, 'id'>;

  export type Output = boolean;
}

export { ICheckIfCarSpecificationExistsByIdRepository };
