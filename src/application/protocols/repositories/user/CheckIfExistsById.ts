import { User } from '@domain/entities/User';

interface ICheckIfUserExistsByIdRepository {
  checkIfExistsById(
    data: ICheckIfUserExistsByIdRepository.Input
  ): Promise<ICheckIfUserExistsByIdRepository.Output>;
}

namespace ICheckIfUserExistsByIdRepository {
  export type Input = Pick<User, 'id'>;

  export type Output = boolean;
}

export { ICheckIfUserExistsByIdRepository };
