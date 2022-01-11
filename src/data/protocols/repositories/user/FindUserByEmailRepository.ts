import { IUser } from '@domain/models/User';

interface IFindUserByEmailRepository {
  findByEmail(
    data: IFindUserByEmailRepository.Input
  ): Promise<IFindUserByEmailRepository.Output>;
}

namespace IFindUserByEmailRepository {
  export type Input = {
    email: string;
  };

  export type Output = IUser | undefined;
}

export { IFindUserByEmailRepository };
