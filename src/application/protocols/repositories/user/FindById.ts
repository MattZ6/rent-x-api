import { User } from '@domain/entities/User';

interface IFindUserByIdRepository {
  findById(
    data: IFindUserByIdRepository.Input
  ): Promise<IFindUserByIdRepository.Output>;
}

namespace IFindUserByIdRepository {
  export type Input = Pick<User, 'id'> & {
    include?: {
      avatar?: boolean;
    };
  };

  export type Output = User | null;
}

export { IFindUserByIdRepository };
