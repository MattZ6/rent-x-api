import { User } from '@domain/entities/User';

interface IFindUserByEmailRepository {
  findByEmail(
    data: IFindUserByEmailRepository.Input
  ): Promise<IFindUserByEmailRepository.Output>;
}

namespace IFindUserByEmailRepository {
  export type Input = Pick<User, 'email'>;

  export type Output = User | null;
}

export { IFindUserByEmailRepository };
