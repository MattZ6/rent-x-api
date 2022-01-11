import { IUser } from '@domain/models/User';

interface IFindUserByIdRepository {
  findById(
    data: IFindUserByIdRepository.Input
  ): Promise<IFindUserByIdRepository.Output>;
}

namespace IFindUserByIdRepository {
  export type Input = {
    id: string;
  };

  export type Output = IUser | undefined;
}

export { IFindUserByIdRepository };
