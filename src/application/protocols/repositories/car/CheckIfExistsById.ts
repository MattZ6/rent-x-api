import { Car } from '@domain/entities/Car';

interface ICheckIfCarExistsByIdRepository {
  checkIfExistsById(
    data: ICheckIfCarExistsByIdRepository.Input
  ): Promise<ICheckIfCarExistsByIdRepository.Output>;
}

namespace ICheckIfCarExistsByIdRepository {
  export type Input = Pick<Car, 'id'>;

  export type Output = boolean;
}

export { ICheckIfCarExistsByIdRepository };
