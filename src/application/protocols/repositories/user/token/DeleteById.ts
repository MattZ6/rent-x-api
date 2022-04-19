import { UserToken } from '@domain/entities/UserToken';

interface IDeleteUserTokenByIdRepository {
  deleteById(
    data: IDeleteUserTokenByIdRepository.Input
  ): Promise<IDeleteUserTokenByIdRepository.Output>;
}

namespace IDeleteUserTokenByIdRepository {
  export type Input = Pick<UserToken, 'id'>;

  export type Output = void;
}

export { IDeleteUserTokenByIdRepository };
