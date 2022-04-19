import { UserToken } from '@domain/entities/UserToken';

interface ICreateUserTokenRepository {
  create(
    data: ICreateUserTokenRepository.Input
  ): Promise<ICreateUserTokenRepository.Output>;
}

namespace ICreateUserTokenRepository {
  export type Input = Pick<UserToken, 'token' | 'expires_in' | 'user_id'>;

  export type Output = UserToken;
}

export { ICreateUserTokenRepository };
