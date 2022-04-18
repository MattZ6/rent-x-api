import { IUser } from '@domain/entities/User';

interface IFindUserByIdRepository {
  findById(
    data: IFindUserByIdRepository.Input
  ): Promise<IFindUserByIdRepository.Output>;
}

namespace IFindUserByIdRepository {
  export type Input = {
    id: string;
    relations?: Array<keyof Pick<IUser, 'avatar'>>;
  };

  export type Output = IUser | undefined;
}

export { IFindUserByIdRepository };
