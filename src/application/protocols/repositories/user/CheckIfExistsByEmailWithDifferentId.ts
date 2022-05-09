import { User } from '@domain/entities/User';

interface ICheckIfUserExistsByEmailWithDifferentIdRepository {
  checkIfExistsByEmailWithDifferentId(
    data: ICheckIfUserExistsByEmailWithDifferentIdRepository.Input
  ): Promise<ICheckIfUserExistsByEmailWithDifferentIdRepository.Output>;
}

namespace ICheckIfUserExistsByEmailWithDifferentIdRepository {
  export type Input = Pick<User, 'email' | 'id'>;

  export type Output = boolean;
}

export { ICheckIfUserExistsByEmailWithDifferentIdRepository };
