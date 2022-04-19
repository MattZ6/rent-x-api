import { UserToken } from '@domain/entities/UserToken';

interface IFindUserTokenByTokenRepository {
  findByToken(
    data: IFindUserTokenByTokenRepository.Input
  ): Promise<IFindUserTokenByTokenRepository.Output>;
}

namespace IFindUserTokenByTokenRepository {
  export type Input = Pick<UserToken, 'token'>;

  export type Output = UserToken | null;
}

export { IFindUserTokenByTokenRepository };
