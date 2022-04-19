import { User } from '@domain/entities/User';

interface ICheckIfUserExistsByEmailRepository {
  checkIfExistsByEmail(
    data: ICheckIfUserExistsByEmailRepository.Input
  ): Promise<ICheckIfUserExistsByEmailRepository.Output>;
}

namespace ICheckIfUserExistsByEmailRepository {
  export type Input = Pick<User, 'email'>;

  export type Output = boolean;
}

export { ICheckIfUserExistsByEmailRepository };
