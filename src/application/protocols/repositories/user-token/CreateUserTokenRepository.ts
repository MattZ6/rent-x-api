import { IUserToken } from '@domain/entities/UserToken';

interface ICreateUserTokenRepository {
  create(
    data: ICreateUserTokenRepository.Input
  ): Promise<ICreateUserTokenRepository.Output>;
}

namespace ICreateUserTokenRepository {
  export type Input = { token: string; user_id: string; expires_in: Date };

  export type Output = IUserToken;
}

export { ICreateUserTokenRepository };
